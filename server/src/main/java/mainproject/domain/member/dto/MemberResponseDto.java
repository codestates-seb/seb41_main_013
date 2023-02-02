package mainproject.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data // 매퍼 사용시 데이타를 이용하여 의존성 주입
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private long id;

    private String name;

    private String email;

    private long profileImageId;

    private String profileImageUrl;

    private List<String> roles;
}
