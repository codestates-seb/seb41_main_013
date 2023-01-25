package mainproject.domain.snapshot.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SnapshotResponseDto {
    private String snapshotId;
    private long memberId;
    private String memberName;
    private long profileImageId;
    private long challengeId;
    private String challengeName;
    private long challengeImageId;
    private long snapshotImageId;
    private LocalDateTime createdAt;
}
