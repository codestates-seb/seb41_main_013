package mainproject.domain.challenger.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChallengerResponseDto {
    private String challengerId;
    private long memberId;
    private String memberName;
    // private Image profileImage;  // TODO: 이미지파일
    private long challengeId;
    private String challengeName;
    // private Image challengeImage;    // TODO: 이미지파일
    // TODO: 참가자 수
    private LocalDateTime createdAt;
}
