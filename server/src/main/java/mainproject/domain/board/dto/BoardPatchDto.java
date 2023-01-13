package mainproject.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import mainproject.global.category.Category;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Data
public class BoardPatchDto {
    private long boardId;
    private Category category;
    private String title;
    @NotBlank(message = "질문내용 수정을 하지 않을 경우 등록이 불가합니다.")
    private String content;

    // private String boardImage;

}
