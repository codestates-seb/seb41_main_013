package mainproject.domain.image.service;

import mainproject.domain.image.dto.ImageResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    ImageResponseDto saveImage(MultipartFile file) throws IOException;
}
