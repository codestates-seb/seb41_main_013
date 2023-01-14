package mainproject.domain.challenge.entity;

import lombok.Data;
import mainproject.domain.challenger.Entity.Challenger;
import mainproject.domain.member.entity.Member;
import mainproject.global.category.Category;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    // private Image challengeImage;  // TODO: 이미지파일 (Nullable)

    @Column(nullable = false)
    private LocalDate startAt;

    @Column(nullable = false)
    private LocalDate endAt;

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

    @OneToMany(mappedBy = "challenge")
    private List<Challenger> challengers = new ArrayList<>();

    public void setChallengers(Challenger challenger) {
        challengers.add(challenger);
        if (challenger.getChallenge() != this) {
            challenger.setChallenge(this);
        }
    }
}
