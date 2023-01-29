package mainproject.domain.image.controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

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

        /*
        File convertedFile = convertFile(file);
        response.setUrl(upload(convertedFile));
         */
        response.setUrl("generatePresignedUrl()");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
    // MultipartFile을 File로 변환
    private File convertFile(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }

            return Optional.of(convertFile)
                    .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환 실패"));
        }

        return new File("");
    }

    // 파일 등록, presignedURL 리턴, 파일 삭제
    private String upload(File convertedFile) {
        String bucketName = "s3://bucket-deploy-challenge";
        //String bucketName = "http://bucket-deploy-challenge.s3-website.ap-northeast-2.amazonaws.com";
        String fileName = "/" + convertedFile.getName();

        AmazonS3Client amazonS3Client = new AmazonS3Client();
        amazonS3Client.putObject(
                new PutObjectRequest(bucketName, fileName, convertedFile).withCannedAcl(CannedAccessControlList.PublicRead)
        );

        removeFile(convertedFile);

        return amazonS3Client.getUrl(bucketName, fileName).toString();
    }

    // 파일 삭제
    private void removeFile(File convertedFile) {
        if (convertedFile.delete()) {
            System.out.println("파일이 삭제되었습니다.");
        }
        else {
            System.out.println("파일이 삭제되지 못했습니다.");
        }
    }
     */

    @ApiOperation(value = "presignedURL 획득")
    @GetMapping
    public void generatePresignedUrl() throws IOException {
        Regions clientRegion = Regions.DEFAULT_REGION;
        String accessKey = "${cloud.aws.credentials.access-key}";
        String secretKey = "${cloud.aws.credentials.secret-key}";
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        String bucketName = "s3://bucket-deploy-challenge/";
        //String bucketName = "http://bucket-deploy-challenge.s3-website.ap-northeast-2.amazonaws.com/";
        String objectKey = "";

        try {
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withRegion(clientRegion)
                    .withCredentials(new AWSStaticCredentialsProvider(credentials))
                    .build();

            // Set the presigned URL to expire after ten minutes.
            Date expiration = new Date();
            long expTimeMillis = Instant.now().toEpochMilli();
            expTimeMillis += 1000 * 60 * 10;
            expiration.setTime(expTimeMillis);

            // Generate the presigned URL.
            System.out.println("Generating pre-signed URL.");
            GeneratePresignedUrlRequest generatePresignedUrlRequest =
                    new GeneratePresignedUrlRequest(bucketName, objectKey)
                            .withMethod(HttpMethod.PUT)
                            .withExpiration(expiration);
            generatePresignedUrlRequest.addRequestParameter(Headers.S3_CANNED_ACL,
                    CannedAccessControlList.PublicRead.toString());
            URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);

            // return url.toString();
            System.out.println("Pre-Signed URL: " + url.toString());
        } catch (AmazonServiceException e) {
            e. printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
    }
}
