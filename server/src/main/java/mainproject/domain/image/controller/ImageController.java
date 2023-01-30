package mainproject.domain.image.controller;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import mainproject.domain.image.dto.ImageResponseDto;
import mainproject.domain.image.entity.Image;
import mainproject.domain.image.mapper.ImageMapper;
import mainproject.domain.image.service.ImageService;
import mainproject.domain.image.service.ImageServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @ApiOperation(value = "이미지파일 업로드")
    @PostMapping
    public ResponseEntity postImage(@ApiParam(value = "파일 업로드", required = true)
                                        @RequestParam MultipartFile file) throws IOException {
        ImageResponseDto response = imageService.saveImage(file);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

/*
    @ApiOperation(value = "presignedURL 획득")
    @GetMapping
    public String generatePresignedUrl() {
        Regions clientRegion = Regions.AP_NORTHEAST_2;
        String bucketName = "bucket-deploy-challenge";
        String objectKey = "";

        String accessKey = "${AWS_ACCESS_KEY}";
        String secretKey = "${AWS_SECRET_KEY}";
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
        //generatePresignedUrlRequest.addRequestParameter(Headers.SECURITY_TOKEN, );
        URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);

        return url.toString();
    }

    @ApiOperation(value = "이미지파일 조회")
    @GetMapping("/{fileName}")
    public ResponseEntity getImage(@PathVariable("fileName") String fileName) {
        return new ResponseEntity<>(generatePresignedUrl() + fileName, HttpStatus.OK);
    }

 */
}
