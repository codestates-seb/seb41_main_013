
package mainproject.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {
    private long commentId;

    private long memberId;

    private long boardId;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
