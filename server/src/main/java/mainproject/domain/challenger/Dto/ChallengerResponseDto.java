package mainproject.domain.challenger.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChallengerResponseDto {
    private String challengerId;
    private long memberId;
    private long challengeId;
    private LocalDateTime createdAt;
}
