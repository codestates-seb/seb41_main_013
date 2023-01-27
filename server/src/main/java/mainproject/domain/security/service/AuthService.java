package mainproject.domain.security.service;

import lombok.RequiredArgsConstructor;
import mainproject.domain.member.entity.Member;
import mainproject.domain.security.dto.LoginDto;
import mainproject.domain.security.dto.TokenDto;
import mainproject.domain.security.provider.JwtTokenizer;
import mainproject.domain.security.redis.RedisDao;
import mainproject.domain.security.userdetails.CustomUserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenizer jwtTokenizer;
    private final RedisDao redisDao;

    public TokenDto login(LoginDto loginDto) { // 로그인
        // 1. loginDto 기반 authenticationToken 생성 (toAuthentication 메소드 활용)
        UsernamePasswordAuthenticationToken authenticationToken = loginDto.toAuthentication();

        // 2. token 검증
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 accessToken, refreshToken 생성
        TokenDto tokenDto = createToken(authentication);

        // 4. 인증 객체 소환
        Member user = (Member) authentication.getPrincipal();
        tokenDto.setId(user.getId());


        // 5. refreshToken 저장 (Redis)
        redisDao.setValues(user.getEmail(), tokenDto.getRefreshToken(),
                Duration.ofMinutes(jwtTokenizer.getRTExpiration()));

        return tokenDto;
    }

    public TokenDto reissue(HttpServletRequest request, Authentication authentication) { // 토큰 재발급

        String refreshToken = request.getHeader("refreshToken").substring(7);

        // 1. Refresh Token 검증
        if (jwtTokenizer.validateToken(refreshToken) == 1) { // refreshToken 이 만료된 경우
            // 강제 로그아웃 처리 필요
        } else if (jwtTokenizer.validateToken(refreshToken) == 2) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. 인증 정보를 기반으로 토큰 생성
        TokenDto tokenDto = createToken(authentication);

        // 3. 인증 객체 소환
        UserDetails user = (UserDetails) authentication.getPrincipal();

        // 4. refreshToken 덮어쓰기 (Redis)
        redisDao.setValues(user.getUsername(), tokenDto.getRefreshToken(),
                Duration.ofMinutes(jwtTokenizer.getRTExpiration()));

        return tokenDto;
    }

    public void logout(UserDetails user) { // 로그아웃

        String refreshToken = redisDao.getValues(user.getUsername());

        if (refreshToken == null) throw new RuntimeException("REFRESH_TOKEN_NOT_FOUND");

        redisDao.deleteValues(user.getUsername());
    }

    private TokenDto createToken(Authentication authentication) { // 토큰 생성
        String accessToken = jwtTokenizer.generateAccessToken(authentication);
        String refreshToken = jwtTokenizer.generateRefreshToken(authentication);


        TokenDto tokenDto = new TokenDto(accessToken, refreshToken);

        return tokenDto;
    }
}