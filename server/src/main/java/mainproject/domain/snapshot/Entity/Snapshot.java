package mainproject.domain.snapshot.Entity;

import lombok.Data;
import mainproject.domain.challenge.entity.Challenge;
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
    @JoinColumns({
            @JoinColumn(name = "MEMBER_ID", referencedColumnName = "ID"),
            @JoinColumn(name = "MEMBER_NAME", referencedColumnName = "NAME")
            // @JoinColumn(name = "PROFILE_IMAGE", referencedColumnName = "PROFILE_IMAGE")  // TODO: 이미지파일
    })
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getSnapshots().contains(this)) {
            this.member.getSnapshots().add(this);
        }
    }

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "CHALLENGE_ID", referencedColumnName = "CHALLENGE_ID"),
            @JoinColumn(name = "CHALLENGE_NAME", referencedColumnName = "TITLE")
            // @JoinColumn(name = "CHALLENGE_IMAGE", referencedColumnName = "CHALLENGE_IMAGE"),  // TODO: 이미지파일
            // TODO: 참가자 수
    })
    private Challenge challenge;

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
        if (!this.challenge.getSnapshots().contains(this)) {
            this.challenge.getSnapshots().add(this);
        }
    }

    // private Image snapshotImage;  // TODO: 이미지파일

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
