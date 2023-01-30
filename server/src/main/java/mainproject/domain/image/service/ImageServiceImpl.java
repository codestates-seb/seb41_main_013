package mainproject.domain.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import mainproject.domain.image.dto.ImageResponseDto;
import mainproject.domain.image.entity.Image;
import mainproject.domain.image.mapper.ImageMapper;
import mainproject.domain.image.repository.ImageRepository;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final AmazonS3 amazonS3;
    private final ImageRepository imageRepository;
    private final ImageMapper mapper;
    private String bucket = "bucket-deploy-challenge";
    private String folder = "upload";

    @Override
    public ImageResponseDto saveImage(MultipartFile file) throws IOException {
        Image image = uploadImage(file);

        return mapper.imageToImageResponseDto(image);
    }

    private Image uploadImage(MultipartFile file) throws IOException {
        verifiedImage(file);
        String originalName = file.getOriginalFilename();
        String storeFileName = getStoreFileName(originalName);

        long fileSize = file.getSize();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(fileSize);

        amazonS3.putObject(bucket, folder + "/" + storeFileName, file.getInputStream(), objectMetadata);

        Image image = Image.createImage(storeFileName, originalName, amazonS3.getUrl(bucket, folder + "/" + storeFileName).toString(), fileSize);
        imageRepository.save(image);

        return image;
    }

    private void verifiedImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
        }

        verifiedImageName(file.getOriginalFilename());
    }

    private void verifiedImageName(String originalFileName) {
        if (originalFileName == null) {
            throw new BusinessLogicException(ExceptionCode.FILE_NAME_NOT_VALID);
        }

        boolean matches = originalFileName.matches("^[a-zA-Zㄱ-ㅎ가-힣0-9-_]+\\.(jpg|JPG|png|jpeg|JPEG|heif|heic)$");
        if (!matches) {
            throw new BusinessLogicException(ExceptionCode.FILE_NAME_NOT_VALID);
        }
    }

    private String getExtension(String originalFileName) {
        int pos = originalFileName.lastIndexOf(".");
        return originalFileName.substring(pos + 1);
    }

    private String getStoreFileName(String originalFileName) {
        UUID uuid = UUID.randomUUID();
        String extension = getExtension(originalFileName);
        return uuid + "." + extension;
    }
}
