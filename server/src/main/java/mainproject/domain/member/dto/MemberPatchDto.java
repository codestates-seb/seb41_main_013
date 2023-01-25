package mainproject.domain.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import mainproject.domain.image.entity.Image;

import javax.validation.constraints.Positive;

@Data
public class MemberPatchDto {

    @ApiModelProperty(value = "회원-식별자")
    private long id;

    @ApiModelProperty(value = "회원-닉네임")
    private String name;

    @ApiModelProperty(value = "회원-패스워드")
    private String password;

    @Positive
    @ApiModelProperty(value = "회원-프로필 사진", required = false, example = "1")
    private long profileImageId;

    @ApiModelProperty(hidden = true)
    public Image getImage() {
        Image image = new Image();
        image.setImageId(profileImageId);
        return image;
    }
}
