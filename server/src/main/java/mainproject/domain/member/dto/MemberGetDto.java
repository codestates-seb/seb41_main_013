package mainproject.domain.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MemberGetDto {

    @ApiModelProperty(value = "회원-식별자")
    private long id;

}
