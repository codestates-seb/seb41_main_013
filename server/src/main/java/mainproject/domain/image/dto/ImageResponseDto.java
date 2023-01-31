package mainproject.domain.image.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ImageResponseDto {
    private long imageId;
    private String fileName;
    private long fileSize;
    private String presignedUrl;
    private LocalDateTime createdAt;
}
