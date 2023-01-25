package mainproject.domain.challenger.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChallengerResponseDto {
    private String challengerId;
    private long memberId;
    private String memberName;
    private long profileImageId;
    private long challengeId;
    private String challengeName;
    private long challengeImageId;
    private LocalDateTime createdAt;
}
