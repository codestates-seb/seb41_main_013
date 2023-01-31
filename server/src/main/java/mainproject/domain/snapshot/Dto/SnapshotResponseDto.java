package mainproject.domain.snapshot.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SnapshotResponseDto {
    private String snapshotId;
    private long memberId;
    private String memberName;
    // private Image profileImage;   // TODO: 이미지파일
    private long challengeId;
    private String challengeName;
    // private Image challengeImage; // TODO: 이미지파일
    // private Image snapshotImage;  // TODO: 이미지파일
    private LocalDateTime createdAt;
}
