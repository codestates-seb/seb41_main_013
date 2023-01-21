package mainproject.domain.security.config;

import lombok.RequiredArgsConstructor;
import mainproject.domain.security.handler.CustomAccessDeniedHandler;
import mainproject.domain.security.handler.CustomAuthenticationEntryPoint;
import mainproject.domain.security.provider.JwtTokenizer;
import mainproject.domain.security.service.AuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.swing.text.html.HTML;


@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration  {
    // 여기에 Spring Security 의 설정을 진행
//    JwtTokenizer 클래스는 JWT를 생성하고 검증하는 일을 한다.
    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().disable() // h2 콘솔 화면을 사용하기 위해 옵션을 disable
                .and()

                .csrf().disable()  // CSRF(Cross-Site Request Forgery) 공격에 대한 Spring Security에 대한 설정을 비활성화 // (rest api이므로 csrf 보안이 필요없으므로 disable처리)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)// 스프링시큐리티의 세션정책이다 스프링시큐리티가
                // 생성하지도 않고 기존것을 사용하지도 않는다는 말이다 ->jwt token으로 인증하므로 stateless 하도록 처리.
                .and()

                .httpBasic().disable() // Http basic Auth  기반으로 로그인 인증창이 뜸.  disable 시에 인증창 뜨지 않음
                .formLogin().disable() // : formLogin 대신 Jwt를 사용하기 때문에 disable로 설정

                .exceptionHandling() //예외처리 기능이 작동
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint()) // 인증이 되지않은 유저가 요청을 했을때 동작된다. (인증 실패시 처리)
                .accessDeniedHandler(new CustomAccessDeniedHandler()) //서버에 요청을 할 때 액세스가 가능한지 권한을 체크후 액세스 할 수 없는 요청을 했을시 동작된다 (인가 실패시 처리)
                .and()

                .apply(new CustomFilterConfiguration(jwtTokenizer, authService))
                .and()

                .authorizeRequests(auth -> auth
                        .antMatchers("/h2/**").permitAll() // h2 데이터베이스 확인 가능하게
                        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // preflight 요청 모두 pass
                        .antMatchers(HttpMethod.POST, "/api/challenges").hasRole("USER") // 챌린지 생성

                        .antMatchers(HttpMethod.DELETE, "/api/challenges/{challengeId}")
                        .access("@challengeService.checkMember(principal, T(Long).parseLong(#challengeId))") // 챌린지 삭제

                        .antMatchers(HttpMethod.POST, "api/challengers").hasRole("USER")    // 챌린지 참가

                        .antMatchers(HttpMethod.GET, "api/challengers/{memberId}/**")
                        .access("@challengerService.checkMember(principal, T(Long).parseLong(#memberId))") // 회원이 참가중or참가했던 챌린지 조회

                        .antMatchers(HttpMethod.POST, "api/snapshots")
                        .access("@challengerService.checkMember(principal, snapshot.getMember().getId())")   // 인증사진 등록

                        .antMatchers(HttpMethod.POST, "/api/boards").hasRole("USER") // 게시판 글 작성
                        .antMatchers(HttpMethod.PATCH, "/api/boards/{board-id}")
                        .access("@BoardService.checkMember(authentication,#BoardId)") // 게시판 글 수정
                        .antMatchers(HttpMethod.DELETE, "/api/boards/{board-id}")
                        .access("@BoardService.checkMember(authentication,#BoardId)")// 게시판 글 삭제
                        .antMatchers(HttpMethod.POST, "/api/comments").hasRole("USER") // 댓글 작성
                        .antMatchers(HttpMethod.PATCH, "/api/comments/{comment-id}")
                        .access("@CommentService.checkMember(authentication,#CommentId)")// 댓글 수정
                        .antMatchers(HttpMethod.DELETE, "/api/comments/{comment-id}")
                        .access("@CommentService.checkMember(authentication,#CommentId)")// 댓글 삭제
                        .antMatchers("/api/auths/logout").hasRole("USER") // 로그아웃
                        .antMatchers("/api/members/{member-id}").hasRole("USER") // 마이페이지 확인, 회원정보 수정

                        .anyRequest().permitAll())
                .logout()
                .disable();

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}




