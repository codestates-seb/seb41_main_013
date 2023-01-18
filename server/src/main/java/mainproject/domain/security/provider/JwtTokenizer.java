package mainproject.domain.security.provider;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenizer {
    private final Key key;

    @Getter
    @Value("${jwt.ATExpiration}") // AT : Access Token / 만료기간
    private int ATExpiration;

    @Getter
    @Value("${jwt.RTExpiration}") //Refresh Token / 만료기간
    private int RTExpiration;

    private final UserDetailsService userDetailsService;

    public JwtTokenizer(@Value("${jwt.key}") String secretKey,
                        UserDetailsService userDetailsService) {
        this.key = getKeyFromEncodedSecretKey(encodeSecretKey(secretKey));
        this.userDetailsService = userDetailsService;
    }

    public String encodeSecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    private Key getKeyFromEncodedSecretKey(String encodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(encodedSecretKey);
        Key secretKey = Keys.hmacShaKeyFor(keyBytes);

        return secretKey;
    }

    public String generateAccessToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Map<String, String> claims = new HashMap<>();
        claims.put("auth", authorities);

        long now = (new Date()).getTime();

        Date accessTokenExpiresIn = new Date(now + ATExpiration * 1000 * 60);
        return Jwts.builder()
                .setClaims(claims)  // JWT에 담는 body
                .setSubject(authentication.getName())    // JWT 제목 payload "sub": "email"
                .setIssuedAt(Calendar.getInstance().getTime())  // JWT 발행일자 payload "iat": "발행일자"
                .setExpiration(accessTokenExpiresIn)  // 만료일자 payload "exp": "발행시간 + 설정 시간(ATExpiration)"
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(Authentication authentication) {

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Map<String, String> claims = new HashMap<>();
        claims.put("auth", authorities);

        long now = (new Date()).getTime();

        Date refreshTokenExpiresIn = new Date(now + RTExpiration * 1000 * 60);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(authentication.getName())    // JWT 제목 payload "sub": "email"
                .setIssuedAt(Calendar.getInstance().getTime())  // JWT 발행일자 payload "iat": "발행일자"
                .setExpiration(refreshTokenExpiresIn)  // 만료일자 payload "exp": "발행시간 + 설정 시간(RTExpiration)"
                .signWith(key)  // signature header "alg": "HS512"
                .compact(); // 생성
    }

    // 엑세스 토큰에서 인증정보 가져오기
    public Authentication getAuthentication(String accessToken) {

        Claims claims = parseClaims(accessToken); // 클레임 정보 추출

        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities = // 권한 정보 가져오기
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = userDetailsService.loadUserByUsername(claims.getSubject());

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보를 검증
    public int validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return 0;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.error("잘못된 JWT 서명입니다.", e);
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰입니다. 재발급을 진행합니다.", e);
            return 1;
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT 토큰입니다.", e);
        } catch (IllegalArgumentException e) {
            log.error("JWT 토큰이 잘못되었습니다.", e);
        }
        return 2;
    }

    public Claims parseClaims(String accessToken) { // 토큰 정보 확인 (만료 토큰도 확인 가능)
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}