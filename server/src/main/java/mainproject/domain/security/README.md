JwtAuthenticationFilter
: 클라이언트 요청 시 JWT 인증을 하기 위해 설치하는 Custom Filter로 UsernamePasswordAuthenticationFilter 이전에 실행됩니다.

JwtTokenProvider
: JWT 토큰 생성, 토큰 복호화 및 정보 추출, 토큰 유효성 검증의 기능이 구현된 클래스입니다.
Security
WebSecurityConfig
: Secutiry 설정을 위한 class로 WebSecurityConfigurerAdapter를 상속받습니다.
CustomUserDetailsService
: 인증에 필요한 UserDetailsService interface의 loadUserByUsername 메서드를 구현하는 클래스로 loadUserByUsername 메서드를 통해 Database에 접근하여 사용자 정보를 가지고 옵니다.

SecurityUtil
: 클라이언트 요청 시 JwtAuthenticationFilter에서 인증되어 SecurityContextHolder에 저장된 Authentication 객체 정보를 가져오기 위해서 만든 클래스입니다.