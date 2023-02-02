package mainproject.domain.image.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import mainproject.domain.image.entity.Image;
import mainproject.domain.image.repository.ImageRepository;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
public class ImageService {
    @Value("${AWS_ACCESS_KEY_ID}")
    private String accessKey;

    @Value("${AWS_SECRET_ACCESS_KEY}")
    private String secretKey;

    private Regions clientRegion = Regions.AP_NORTHEAST_2;
    private String bucketName = "bucket-deploy-challenge";
    private String objectKey = "upload/";

    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    // DB에 이미지 등록
    public Image createImage(MultipartFile file) {
        verifiedImage(file);    // 이미지파일 검증

        // 이미지 객체 임시 생성 후 저장
        Image image = createTempImage("temp", "temp", 1L);
        imageRepository.save(image);

        String fileName = file.getOriginalFilename();
        long fileSize = file.getSize();

        // 실제 파일명, 크기로 수정하여 저장
        image.setOriginalFileName(fileName);
        image.setStoredFileName(image.getImageId() + "_" + fileName);
        image.setFileSize(fileSize);

        return imageRepository.save(image);
    }

    // 이미지 객체 생성
    public Image createTempImage(String originalFileName, String storedFileName, long fileSize) {
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
        } else if (file.getOriginalFilename() == null ||
                !file.getOriginalFilename().matches("^[a-zA-Zㄱ-ㅎ가-힣0-9-_ ]+\\.(jpg|JPG|png|PNG|jpeg|JPEG|heif|heic)$")) {
            throw new BusinessLogicException(ExceptionCode.FILE_NAME_NOT_VALID);
        }
    }

    // S3 버킷에 이미지 업로드
    public void uploadImage(MultipartFile file, String storedFileName) throws IOException {
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();

        objectKey = "upload/" + storedFileName;

        // S3 버킷에 저장
        s3Client.putObject(bucketName, objectKey, convertFile(file));

        // 로컬 파일 삭제
        convertFile(file).delete();
    }

    // MultipartFile -> File 변환
    public File convertFile(MultipartFile file) throws IOException {
        File convertedFile = new File(file.getOriginalFilename());

        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());

        return convertedFile;
    }

    // presignedUrl 발급
    public String createPresignedUrl(long imageId) {
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();

        Image findImage = findVerifiedImage(imageId);
        String storedFileName = findImage.getStoredFileName();
        objectKey = "upload/" + storedFileName;

        // 유효시간을 60분으로 설정
        Date expiration = new Date();
        long expTimeMillis = Instant.now().toEpochMilli();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);

        // URL 생성
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, objectKey)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);
        URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);

        return url.toString();
    }

    // 이미지 존재여부 검증
    public Image findVerifiedImage(long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);

        return optionalImage.orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
    }
}

