package mainproject.domain.member.dto;


import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.domain.image.entity.Image;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberPostDto {

    @NotBlank( message = "이름은 필수 입력 값입니다.")
    @ApiModelProperty(value = "회원-닉네임")
    private String name;

    @Email(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요")
    @ApiModelProperty(value = "회원-이메일")
    private String email;

    @NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
    @Length(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요")
    @ApiModelProperty(value = "회원-비밀번호")
    private String password;

    @ApiModelProperty(hidden = true)
    public Image getImage() {
        Image image = new Image();
        image.setImageId(1L);   // 기본 프로필 이미지
        return image;
    }
}
