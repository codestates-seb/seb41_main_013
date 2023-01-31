package mainproject.domain.board.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;


import mainproject.domain.image.entity.Image;
import mainproject.global.category.Category;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@AllArgsConstructor
@Data
public class BoardPatchDto {
    @NotNull
    @Positive
    private long boardId;

    private Category category;

    @NotBlank
    private String title;
    @NotBlank(message = "질문내용 수정을 하지 않을 경우 등록이 불가합니다.")
    private String content;

//    @Positive
//    @ApiModelProperty(required = false, example = "1")
//    private long boardImageId;
//
//    @ApiModelProperty(hidden = true)
//    public Image getImage() {
//        Image image = new Image();
//        image.setImageId(boardImageId);
//        return image;
//    }

}
