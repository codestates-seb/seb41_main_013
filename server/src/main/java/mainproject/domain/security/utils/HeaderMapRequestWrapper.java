package mainproject.domain.security.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.LinkedCaseInsensitiveMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.util.Map;

@Slf4j
public class HeaderMapRequestWrapper extends HttpServletRequestWrapper {

    private final Map<String, String> headerMap;
    public HeaderMapRequestWrapper(HttpServletRequest request) {
        super(request);
        this.headerMap = new LinkedCaseInsensitiveMap<>();;
    }

    public void addHeader(String name, String value) {
        headerMap.put(name, value);
    }

    @Override
    public String getHeader(String name) {
        String headerValue = headerMap.get(name);
        if (headerValue != null) {
            return headerValue;
        }
        return ((HttpServletRequest) getRequest()).getHeader(name);
    }
}
