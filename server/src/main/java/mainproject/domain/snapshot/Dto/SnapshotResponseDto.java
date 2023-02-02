package mainproject.domain.snapshot.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SnapshotResponseDto {
    private String snapshotId;
    private long memberId;
    private String memberName;
    private long profileImageId;
    private String profileImageUrl;
    private long challengeId;
    private String challengeName;
    private long challengeImageId;
    private String challengeImageUrl;
    private long snapshotImageId;
    private String snapshotImageUrl;
    private LocalDateTime createdAt;
}
