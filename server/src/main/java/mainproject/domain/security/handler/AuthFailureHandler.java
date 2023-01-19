package mainproject.domain.security.handler;

import lombok.extern.slf4j.Slf4j;
import mainproject.domain.security.utils.ErrorResponder;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class AuthFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        log.error("# Authentication Failed : {}", exception.getMessage());

        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
    }
}
