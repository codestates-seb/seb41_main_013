package mainproject.domain.image.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ImageResponseDto {
    private long imageId;
    private String fileName;
    private String originalFileName;
    private String remotePath;
    private long fileSize;
    private LocalDateTime createdAt;
}
