
package mainproject.domain.comment.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class CommentPostDto {
    private long commentId;

    @NotBlank
    private String content;
}


