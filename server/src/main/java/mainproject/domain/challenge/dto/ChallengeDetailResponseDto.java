package mainproject.domain.challenge.dto;

import lombok.Data;
import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.domain.challenge.entity.Frequency;
import mainproject.global.category.Category;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class ChallengeDetailResponseDto {
    private long challengeId;
    private long hostMemberId;
    private String hostMemberName;
    private long hostProfileImageId;
    private String hostProfileImageUrl;
    private Category category;
    private String title;
    private String content;
    private long challengeImageId;
    private String challengeImageUrl;
    private LocalDate startAt;
    private LocalDate endAt;
    private Frequency frequency;
    private LocalTime snapshotStartAt;
    private LocalTime snapshotEndAt;
    private LocalDateTime createdAt;
    private ChallengeStatus challengeStatus;
    private long challengerCount;
    private String checkChallenging;
}
