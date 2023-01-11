package mainproject.domain.member.entity;


import lombok.*;

import javax.persistence.*;

@Getter //get 함수를 일괄적으로 만들어 준다.
@Setter
@NoArgsConstructor // 기본 생성자를 만들어준다
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 생성
@Entity
@Builder
@Table(name = "member")
public class Member {

    @Id // @Id는 해당 프로퍼티가 테이블의 primary key 역할이라는 것을 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID가 자동으로 생성 및 증가한다.
    private long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 100, nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;


}
