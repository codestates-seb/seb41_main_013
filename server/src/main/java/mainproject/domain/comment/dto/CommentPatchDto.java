
package mainproject.domain.comment.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class CommentPatchDto {
    private long commentId;

    @NotBlank
    private String content;


}
