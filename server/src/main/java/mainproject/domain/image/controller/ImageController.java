package mainproject.domain.image.controller;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import mainproject.domain.image.dto.ImageResponseDto;
import mainproject.domain.image.entity.Image;
import mainproject.domain.image.mapper.ImageMapper;
import mainproject.domain.image.service.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.Instant;
import java.util.Date;

@RestController
@RequestMapping(value = "/api/upload")
@Api(tags = "이미지파일 업로드")
public class ImageController {
    @Value("${AWS_ACCESS_KEY}")
    private String accessKey;

    @Value("${AWS_SECRET_KEY}")
    private String secretKey;

    private final ImageService imageService;
    private final ImageMapper mapper;

    public ImageController(ImageService imageService, ImageMapper mapper) {
        this.imageService = imageService;
        this.mapper = mapper;
    }

    @ApiOperation(value = "1. 이미지를 버킷에 업로드하기 위한 presignedURL 발급")
    @PostMapping
    public ResponseEntity generatePutPresignedURL(@RequestParam MultipartFile file) throws IOException {
        Regions clientRegion = Regions.AP_NORTHEAST_2;
        String bucketName = "bucket-deploy-challenge";
        String objectKey = "upload/" + file.getOriginalFilename();

        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();

        s3Client.putObject(bucketName, objectKey, imageService.convertFile(file));
        //s3Client.deleteObject(bucketName, objectKey);

        // URL 유효시간 24시간으로 설정
        Date expiration = new Date();
        long expTimeMillis = Instant.now().toEpochMilli();
        expTimeMillis += 1000 * 60 * 60 * 24;
        expiration.setTime(expTimeMillis);

        // URL 발급
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, objectKey)
                        .withMethod(HttpMethod.PUT)
                        .withExpiration(expiration);
        generatePresignedUrlRequest.addRequestParameter(Headers.S3_CANNED_ACL,
                CannedAccessControlList.PublicRead.toString());
        String url = s3Client.generatePresignedUrl(generatePresignedUrlRequest).toString();

        return new ResponseEntity(url.toString(), HttpStatus.OK);

    }

    @ApiOperation(value = "2. 이미지파일 정보 DB에 업로드, S3 버킷에 업로드 후 조회를 위한 URL 출력")
    @PutMapping
    public ResponseEntity postImage(@ApiParam(value = "파일 업로드", required = true)
                                        @RequestParam MultipartFile file) {
        Image image = imageService.uploadImage(file);

        ImageResponseDto response = mapper.imageToImageResponseDto(image);

        response.setPresignedUrl(generateGetPresignedUrl(response.getFileName()));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private String generateGetPresignedUrl(@Nullable String fileName) {
        Regions clientRegion = Regions.AP_NORTHEAST_2;
        String bucketName = "bucket-deploy-challenge";
        String objectKey = "upload/" + fileName;

        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();

        // URL 유효시간을 10분으로 설정
        Date expiration = new Date();
        long expTimeMillis = Instant.now().toEpochMilli();
        expTimeMillis += 1000 * 60 * 10;
        expiration.setTime(expTimeMillis);

        // URL 발급
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, objectKey)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);
        URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);

        return url.toString();
    }
}
