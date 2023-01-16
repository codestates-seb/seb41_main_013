package mainproject.domain.board.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.domain.comment.entity.Comment;
import mainproject.domain.member.entity.Member;
import mainproject.global.category.Category;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Board implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getBoards().contains(this)) {
            this.member.getBoards().add(this);
        }
    }

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    private String title;

    private String content;

    //private Image boardImage;  // TODO: 이미지파일 (Nullable)

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "board")
    private List<Comment> comments = new ArrayList<>();

    public void setComments(Comment comment) {
        comments.add(comment);
        if (comment.getBoard() != this) {
            comment.setBoard(this);
        }
    }
}
