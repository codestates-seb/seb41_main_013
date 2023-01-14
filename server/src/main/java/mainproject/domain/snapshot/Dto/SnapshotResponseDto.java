package mainproject.domain.snapshot.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SnapshotResponseDto {
    private String snapshotId;
    private long memberId;
    private long challengeId;
    // private Image snapshotImage;  // TODO: 이미지파일 (Nullable)
    private LocalDateTime createdAt;
}
