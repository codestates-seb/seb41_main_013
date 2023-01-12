package mainproject.domain.answer.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.domain.board.entity.Board;

import javax.persistence.*;
import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

  /*  @JoinColumn name="id")
    @ManyToOne
    private Member member;

   */

    @JoinColumn(name = "boardId")
    @ManyToOne
    private Board board;

    private String content;



    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

}
