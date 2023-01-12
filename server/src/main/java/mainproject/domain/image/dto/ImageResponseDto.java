package mainproject.domain.image.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ImageResponseDto {
    private long imageId;
    private String originalFileName;
    private String storedFileName;
    private long fileSize;
    private LocalDateTime createdAt;
}
