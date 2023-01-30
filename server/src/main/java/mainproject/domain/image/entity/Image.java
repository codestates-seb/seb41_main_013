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

    private String fileName;

    private String originalFileName;

    private String remotePath;

    private long fileSize;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    public static Image createImage(String fileName, String originalFileName, String remotePath, long fileSize) {

        Image image = new Image();
        image.fileName = fileName;
        image.originalFileName = originalFileName;
        image.remotePath = remotePath;
        image.fileSize = fileSize;

        return image;
    }

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

    @OneToOne(mappedBy = "image")
    private Board board;

    public void setBoard(Board board) {
        this.board = board;
        if (board.getImage()!= this) {
            board.setImage(this);
        }
    }
}
