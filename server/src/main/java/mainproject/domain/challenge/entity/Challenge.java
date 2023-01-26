package mainproject.domain.challenge.entity;

import lombok.Data;
import mainproject.domain.challenger.Entity.Challenger;
import mainproject.domain.image.entity.Image;
import mainproject.domain.member.entity.Member;
import mainproject.domain.snapshot.Entity.Snapshot;
import mainproject.global.category.Category;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Challenge implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHALLENGE_ID")
    private long challengeId;

    @ManyToOne
    @JoinColumn(name = "HOST_MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getChallenges().contains(this)) {
            this.member.getChallenges().add(this);
        }
    }

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @OneToOne
    @JoinColumn(name = "CHALLENGE_IMAGE_ID")
    private Image image;

    public void setImage(Image image) {
        this.image = image;
        if (this.image.getChallenge() != this) {
            this.image.setChallenge(this);
        }
    }

    @Column(nullable = false)
    private LocalDate startAt;

    @Column(nullable = false)
    private LocalDate endAt;

    @Column(nullable = false, updatable = false)
    private int challengeDay;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Frequency frequency;

    @Column(nullable = false)
    private LocalTime snapshotStartAt;

    @Column(nullable = false)
    private LocalTime snapshotEndAt;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ChallengeStatus challengeStatus;

    @Column(nullable = false)
    private long challengerCount = 0;

    @OneToMany(mappedBy = "challenge")
    private List<Challenger> challengers = new ArrayList<>();

    public void setChallengers(Challenger challenger) {
        challengers.add(challenger);
        if (challenger.getChallenge() != this) {
            challenger.setChallenge(this);
        }
    }

    @OneToMany(mappedBy = "challenge")
    private List<Snapshot> snapshots = new ArrayList<>();

    public void setSnapshots(Snapshot snapshot) {
        snapshots.add(snapshot);
        if (snapshot.getChallenge() != this) {
            snapshot.setChallenge(this);
        }
    }
}
