package mainproject.domain.image.entity;

import lombok.Data;
import mainproject.domain.board.entity.Board;
import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.member.entity.Member;
import mainproject.domain.snapshot.Entity.Snapshot;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @Column(nullable = false)
    private String originalFileName;

    @Column(nullable = false)
    private String storedFileName;

    @Column(nullable = false)
    private long fileSize;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "image")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (member.getImage() != this) {
            member.setImage(this);
        }
    }

    @OneToOne(mappedBy = "image")
    private Challenge challenge;

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
        if (challenge.getImage() != this) {
            challenge.setImage(this);
        }
    }

    @OneToOne(mappedBy = "image")
    private Snapshot snapshot;

    public void setSnapshot(Snapshot snapshot) {
        this.snapshot = snapshot;
        if (snapshot.getImage()!= this) {
            snapshot.setImage(this);
        }
    }

    /*
    @OneToOne(mappedBy = "image")
    private Board board;

    public void setBoard(Board board) {
        this.board = board;
        if (board.getImage()!= this) {
            board.setImage(this);
        }
    }
     */
}
