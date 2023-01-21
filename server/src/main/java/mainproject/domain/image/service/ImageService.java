package mainproject.domain.image.service;

import mainproject.domain.image.entity.Image;
import mainproject.domain.image.repository.ImageRepository;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    // DB에 이미지 등록
    public Image uploadImage(MultipartFile file) throws IOException {
        verifiedImage(file);    // 이미지파일 검증

        // 이미지 객체 임시 생성 후 저장
        Image image = createImage("temp", "temp", 1L);
        imageRepository.save(image);

        String originalFileName = file.getOriginalFilename();
        String storedFileName = image.getImageId() + "_" + originalFileName;
        Long fileSize = file.getSize();

        // 실제 파일명, 크기로 수정하여 저장
        image.setOriginalFileName(originalFileName);
        image.setStoredFileName(storedFileName);
        image.setFileSize(fileSize);

        return imageRepository.save(image);
    }

    // 이미지 객체 생성
    public Image createImage(String originalFileName, String storedFileName, Long fileSize) {
        Image image = new Image();
        image.setOriginalFileName(originalFileName);
        image.setStoredFileName(storedFileName);
        image.setFileSize(fileSize);

        return image;
    }

    // 이미지파일 검증
    public void verifiedImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
        }
        else if (file.getOriginalFilename() == null ||
                !file.getOriginalFilename().matches("^[a-zA-Zㄱ-ㅎ가-힣0-9-_]+\\.(jpg|JPG|png|jpeg|JPEG|heif|heic)$")) {
            throw new BusinessLogicException(ExceptionCode.FILE_NAME_NOT_VALID);
        }
    }
}
