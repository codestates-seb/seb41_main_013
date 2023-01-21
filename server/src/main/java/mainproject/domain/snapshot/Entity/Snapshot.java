package mainproject.domain.snapshot.Entity;

import lombok.Data;
import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.image.entity.Image;
import mainproject.domain.member.entity.Member;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Snapshot implements Serializable {
    @Id
    private String snapshotId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getSnapshots().contains(this)) {
            this.member.getSnapshots().add(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "CHALLENGE_ID")
    private Challenge challenge;

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
        if (!this.challenge.getSnapshots().contains(this)) {
            this.challenge.getSnapshots().add(this);
        }
    }

    @OneToOne
    @JoinColumn(name = "SNAPSHOT_IMAGE_ID")
    private Image image;

    public void setImage(Image image) {
        this.image = image;
        if (this.image.getSnapshot() != this) {
            this.image.setSnapshot(this);
        }
    }

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
