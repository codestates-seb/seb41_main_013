package mainproject.domain.comment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.domain.board.entity.Board;
import mainproject.domain.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getComments().contains(this)) {
            this.member.getComments().add(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    public void setBoard(Board board) {
        this.board = board;
        if (!this.board.getComments().contains(this)) {
            this.board.getComments().add(this);
        }
    }

    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();


    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

   // public Comment(Board board, Member member) {
    //    this.board = board;
    //    this.member = member;
   // }
}

