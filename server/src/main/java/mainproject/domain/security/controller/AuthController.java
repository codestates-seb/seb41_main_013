package mainproject.domain.security.controller;

import lombok.RequiredArgsConstructor;
import mainproject.domain.security.dto.LoginDto;
import mainproject.domain.security.dto.TokenDto;
import mainproject.domain.security.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auths")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*", allowedHeaders = "*", exposedHeaders = {"Authorization", "refreshToken"}, allowCredentials = "true")
public class AuthController {

    private final AuthService authService;
    // 회원 로그인
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDto loginDto, HttpServletResponse response) {

        TokenDto tokenDto = authService.login(loginDto);

        response.addHeader("Authorization", tokenDto.getAccessToken());
        response.addHeader("refreshToken", tokenDto.getRefreshToken());

        return new ResponseEntity<>("Login Successful!", HttpStatus.OK);
    }

    //@AuthenticationPrincipal 로그인 정보를 받아오는 애너테이션
    //@AuthenticationPrincipal 은 UserDetails 타입을 가지고 있음
    // -> UserDetails 타입을 구현한 PrincipalDetails 클래스를 받아 User object를 얻는다
    //https://velog.io/@jyleedev/AuthenticationPrincipal-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%95%EB%B3%B4-%EB%B0%9B%EC%95%84%EC%98%A4%EA%B8%B0

    // 회원 로그아웃
    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request,
                                 @AuthenticationPrincipal UserDetails user) {
        if (user != null) {
            authService.logout(user);
            return new ResponseEntity<>("Logout Successful!", HttpStatus.OK);
        } else {
            return new ResponseEntity("User not Found", HttpStatus.NOT_FOUND);
        }
    }
}

