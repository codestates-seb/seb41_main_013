package mainproject.domain.security.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject.domain.security.dto.LoginDto;
import mainproject.domain.security.dto.TokenDto;
import mainproject.domain.security.provider.JwtTokenizer;
import mainproject.domain.security.redis.RedisDao;
import mainproject.domain.security.utils.ErrorResponder;
import mainproject.global.exception.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;

@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler { // 접근이 불가능 할 때의 Exception
    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {
        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);
        log.warn("Forbidden error happened : {}", accessDeniedException.getMessage());
    }
}
