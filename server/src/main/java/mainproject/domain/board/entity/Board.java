package mainproject.domain.board.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.domain.comment.entity.Comment;

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
    @JoinColumns({
            @JoinColumn(name = "MEMBER_ID",referencedColumnName = "ID"),
            @JoinColumn(name = "HOST_MEMBER_NAME", referencedColumnName = "NAME")
            // @JoinColumn(name = "PROFILE_IMAGE", referencedColumnName = "PROFILE_IMAGE")  // TODO: 이미지파일
    })
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

    //private Image boardImage;  // TODO: 이미지파일


    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now().withNano(0);

    private LocalDateTime modifiedAt = LocalDateTime.now().withNano(0);

    @OneToMany(mappedBy = "board")
    private List<Comment> comments = new ArrayList<>();

    public void setComments(Comment comment) {
        comments.add(comment);
        if (comment.getBoard() != this) {
            comment.setBoard(this);
        }
    }
}
