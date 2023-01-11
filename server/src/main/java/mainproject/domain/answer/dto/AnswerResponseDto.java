package mainproject.domain.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponseDto {

    private long answerId;

    private String img;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
