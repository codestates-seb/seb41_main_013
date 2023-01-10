package mainproject.domain.comment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.domain.board.entity.Board;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;


   /* @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public Comment(Board board, Member member) {
        this.board = board;
        this.member = member;
    }

    */
}

