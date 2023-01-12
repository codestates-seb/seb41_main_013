
package mainproject.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CommentResponseDto {
    private long commentId;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
