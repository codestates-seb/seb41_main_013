package mainproject.domain.board.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.domain.image.entity.Image;
import mainproject.domain.member.entity.Member;
import mainproject.global.category.Category;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardPostDto {
  @NotNull
    @Positive
    private Long memberId;

    @ApiModelProperty(hidden = true)
    public Member getMember() {
        Member member = new Member();
        member.setId(memberId);
        return member;
    }



    @NotNull(message = "카테고리를 선택하세요.")
    private Category category;

    @NotBlank(message = "제목 작성을 하지 않을 경우 등록이 불가합니다.")
    private String title;
    @NotBlank(message = "질문내용 작성을 하지 않을 경우 등록이 불가합니다.")
    private String content;

//    @Positive
//    @ApiModelProperty(required = false, example = "1")
//    private long boardImageId = 1L; // TODO: Nullable 가능하도록 수정
//
//    @ApiModelProperty(hidden = true)
//    public Image getImage() {
//        Image image = new Image();
//        image.setImageId(boardImageId);
//        return image;
//    }
}
