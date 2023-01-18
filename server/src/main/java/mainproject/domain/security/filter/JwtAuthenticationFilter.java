package mainproject.domain.security.filter;

import lombok.RequiredArgsConstructor;
import mainproject.domain.security.dto.TokenDto;
import mainproject.domain.security.provider.JwtTokenizer;
import mainproject.domain.security.service.AuthService;
import mainproject.domain.security.utils.HeaderMapRequestWrapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String accessToken = resolveAccessToken(request); // request header 에서 accessToken 추출
        HeaderMapRequestWrapper wrapper = new HeaderMapRequestWrapper(request); // (reissue 시) header 값 덮어쓰기를 위한 wrapper 객체 생성

        int validateResult = jwtTokenizer.validateToken(accessToken);

        if (validateResult == 0) { // validateToken 이상 없을 경우

            Authentication authentication = jwtTokenizer.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } else if (validateResult == 1) { // jwt 토큰이 만료되었을 경우

            String refreshToken = resolveRefreshToken(request); // request header 에서 refreshToken 추출

            Authentication authentication = jwtTokenizer.getAuthentication(refreshToken); // refreshToken 으로 authentication 생성
            // -> 만료된 accessToken 으로는 getAuthentication 불가능하기 때문
            SecurityContextHolder.getContext().setAuthentication(authentication);

            TokenDto tokenDto = authService.reissue(request, authentication); // 토큰 재발급

            setHeaderResponse(wrapper, response, tokenDto); // header, response 값 재설정

        }
        // validateToken 결과값이 2(이상 없음 or 토큰 만료가 아닌 겅우)인 경우 바로 다음 필터링 진행
        filterChain.doFilter(wrapper, response);
    }

    @Override
    // 해당 url 들은 filter 를 거치지 않도록 설정 (토큰 인증이 필요 없는 endpoint)
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        String[] urls = new String[] {"/api/members", "/api/auths/login"}; // 회원가입, 로그인은 토큰이 필요 없음

        return Arrays.stream(urls).anyMatch(s -> s.equals(path));
    }

    private String resolveAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    private String resolveRefreshToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("RefreshToken");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    private void setHeaderResponse(HeaderMapRequestWrapper wrapper,
                                   HttpServletResponse response,
                                   TokenDto tokenDto) {

        // accessToken, refreshToken Header 값 새로 덮어쓰기
        wrapper.addHeader("Authorization", tokenDto.getAccessToken());
        wrapper.addHeader("RefreshToken", tokenDto.getRefreshToken());

        // reissue 후 response header 에 새로운 accessToken, refreshToken 값 추가
        response.addHeader("Authorization", tokenDto.getAccessToken());
        response.addHeader("RefreshToken", tokenDto.getRefreshToken());
    }
}
