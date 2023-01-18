package mainproject.domain.security.config;

import lombok.RequiredArgsConstructor;
import mainproject.domain.security.filter.JwtAuthenticationFilter;
import mainproject.domain.security.provider.JwtTokenizer;
import mainproject.domain.security.service.AuthService;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class CustomFilterConfiguration extends AbstractHttpConfigurer<CustomFilterConfiguration, HttpSecurity> {
    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;
    // JwtAuthenticationFilter 클라이언트 요청 시 JWT 인증을 하기 위해 설치하는 Custom Filter로 UsernamePasswordAuthenticationFilter 이전에 실행
    @Override
    public void configure(HttpSecurity http) { // Custom Filter 추가 (jwtTokenizer 주입)
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenizer, authService);
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}