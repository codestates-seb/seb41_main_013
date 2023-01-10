package mainproject.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseDto {
    private long boardId;
    private String title;
    private String content;

    private String boardImage;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}
