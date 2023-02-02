package mainproject.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.domain.board.entity.Board;
import mainproject.global.category.Category;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseDto {
    private long boardId;

    private long memberId;

    private String memberName;

    private long profileImageId;

    private String profileImageUrl;

    private Category category;

    private String title;

    private String content;


  //  private long boardImageId;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;


    public BoardResponseDto(Board entity) {
        this.boardId = entity.getBoardId();
    //    this.member = entity.getMember().getName();
        this.title = entity.getTitle();
        this.content = entity.getContent();
    }
}
