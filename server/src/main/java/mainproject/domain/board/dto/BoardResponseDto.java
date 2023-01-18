package mainproject.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.domain.board.entity.Board;
import mainproject.global.category.Category;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseDto {
    private long boardId;

    private long memberId;

    private String memberName;

    // private Image profileImage;   // TODO: 이미지파일

    private Category category;

    private String title;

    private String content;

    //private Image boardImage;  // TODO: 이미지파일

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;


    public BoardResponseDto(Board entity) {
        this.boardId = entity.getBoardId();
    //    this.member = entity.getMember().getName();
        this.title = entity.getTitle();
        this.content = entity.getContent();
    }
}
