package mainproject.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardPostDto {
    @NotBlank(message = "제목 작성을 하지 않을 경우 등록이 불가합니다.")
    private String title;
    @NotBlank(message = "질문내용 작성을 하지 않을 경우 등록이 불가합니다.")
    private String content;

    private String boardImage;
}
