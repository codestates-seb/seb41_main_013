package mainproject.domain.challenger.Dto;

import lombok.Data;
import mainproject.domain.challenge.entity.Frequency;
import mainproject.global.category.Category;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class ChallengerDetailResponseDto {
    private String challengerId;
    private long memberId;
    private String memberName;
    private long profileImageId;
    private String profileImageUrl;
    private long challengeId;
    private String challengeName;
    private long challengeImageId;
    private String challengeImageUrl;
    private Category category;
    private LocalDate startAt;
    private LocalDate endAt;
    private Frequency frequency;
    private LocalTime snapshotStartAt;
    private LocalTime snapshotEndAt;
    private long challengerCount;
    private LocalDateTime createdAt;
    private int progress;
}
