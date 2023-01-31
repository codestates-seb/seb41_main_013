package mainproject.domain.challenger.Entity;

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
public class Challenger implements Serializable {
    @Id
    private String challengerId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getChallengers().contains(this)) {
            this.member.getChallengers().add(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "CHALLENGE_ID")
    private Challenge challenge;

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
        if (!this.challenge.getChallengers().contains(this)) {
            this.challenge.getChallengers().add(this);
        }
    }

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private int snapshotCount = 0;
}
