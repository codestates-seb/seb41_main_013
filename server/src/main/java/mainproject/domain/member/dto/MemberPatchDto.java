package mainproject.domain.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class MemberPatchDto {

    @ApiModelProperty(value = "회원-식별자")
    private long id;

    @ApiModelProperty(value = "회원-닉네임")
    private String name;

    @ApiModelProperty(value = "회원-패스워드")
    private String password;
}
