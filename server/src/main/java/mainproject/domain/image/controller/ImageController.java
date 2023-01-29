package mainproject.domain.image.controller;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.Instant;

@RestController
@RequestMapping(value = "/api/upload")
@Api(tags = "이미지파일 업로드")
public class ImageController {
    private final ImageService imageService;
    private final ImageMapper mapper;

    public ImageController(ImageService imageService, ImageMapper mapper) {
        this.imageService = imageService;
        this.mapper = mapper;
    }

    @ApiOperation(value = "이미지파일 업로드")
    @PostMapping    //(consumes = "multipart/form‑data")
    public ResponseEntity postImage(@ApiParam(value = "파일 업로드", required = true)
                                        @RequestParam MultipartFile file) throws IOException {
        Image image = imageService.uploadImage(file);

        ImageResponseDto response = mapper.imageToImageResponseDto(image);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "presignedURL 획득")
    @GetMapping
    public static String generatePresignedUrl() {
        Regions clientRegion = Regions.DEFAULT_REGION;
        String bucketName = "bucket-deploy-challenge";
        String objectKey = "s3://bucket-deploy-challenge";

        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(clientRegion)
                .withCredentials(new ProfileCredentialsProvider())
                .build();

        // Set the presigned URL to expire after one hour.
        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = Instant.now().toEpochMilli();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);

        // Generate the presigned URL.
        System.out.println("Generating pre-signed URL.");
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, objectKey)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);
        URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);

        return url.toString();
    }
}
