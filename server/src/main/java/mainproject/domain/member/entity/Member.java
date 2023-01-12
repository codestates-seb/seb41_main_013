package mainproject.domain.member.entity;


import lombok.*;
import mainproject.domain.comment.entity.Comment;
import mainproject.domain.board.entity.Board;
import mainproject.domain.challenge.entity.Challenge;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter //get 함수를 일괄적으로 만들어 준다.
@Setter
@NoArgsConstructor // 기본 생성자를 만들어준다
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 생성
@Entity
@Builder
@Table(name = "member")
public class Member {
    @Id // @Id는 해당 프로퍼티가 테이블의 primary key 역할이라는 것을 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID가 자동으로 생성 및 증가한다.
    private long id;

    @Column(length = 50, nullable = false)
    private String name;

    //private Image profileImage;  // TODO: 이미지파일 (Nullable)

    @Column(length = 100, nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Challenge> challenges = new ArrayList<>();

    public void setChallenges(Challenge challenge) {
        challenges.add(challenge);
        if (challenge.getMember() != this) {
            challenge.setMember(this);
        }
    }

    @OneToMany(mappedBy = "member")
    private List<Board> boards = new ArrayList<>();

    public void setBoards(Board board) {
        boards.add(board);
        if (board.getMember() != this) {
            board.setMember(this);
        }
    }

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    public void setComments(Comment comment) {
        comments.add(comment);
        if (comment.getMember() != this) {
            comment.setMember(this);
        }
    }
}
