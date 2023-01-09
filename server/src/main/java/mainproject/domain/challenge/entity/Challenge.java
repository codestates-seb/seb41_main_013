package mainproject.domain.challenge.entity;

import lombok.Data;
import mainproject.global.category.Category;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Entity
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long challengeId;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    //private image;  // TODO: 이미지파일 (Nullable)

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
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ChallengeStatus challengeStatus = ChallengeStatus.시작전;

    /*
     if 현재날짜 < 시작날짜 -> 시작전
     else if 현재날짜 < 종료날짜 -> 진행중
     else 종료
     */

    public void setChallengeStatus(ChallengeStatus challengeStatus) {
        if (LocalDate.now().isBefore(startAt)) {
            this.challengeStatus = ChallengeStatus.시작전;
        }
        else if (LocalDate.now().isBefore(endAt)) {
            this.challengeStatus =  ChallengeStatus.진행중;
        }
        else this.challengeStatus = ChallengeStatus.종료;
    }
}
