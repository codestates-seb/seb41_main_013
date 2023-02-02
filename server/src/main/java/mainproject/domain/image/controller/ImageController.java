package mainproject.domain.image.controller;

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

    @ApiOperation(value = "이미지를 버킷에 업로드하고 조회할 수 있는 presignedURL 발급")
    @PutMapping
    public ResponseEntity postImage(@ApiParam(value = "파일 업로드 후 ", required = true)
                                                      @RequestParam MultipartFile file) throws IOException {
        // 이미지 객체를 DB에 저장
        Image image = imageService.createImage(file);
        ImageResponseDto response = mapper.imageToImageResponseDto(image);

        // S3 버킷에 저장
        imageService.uploadImage(file, response.getStoredFileName());

        response.setPresignedUrl(imageService.createPresignedUrl(image.getImageId()));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "이미지 조회를 위한 presignedURL 발급")
    @GetMapping
    public ResponseEntity generateGetPresignedUrl(long imageId) {
        Image image = imageService.findVerifiedImage(imageId);

        ImageResponseDto response = mapper.imageToImageResponseDto(image);

        response.setPresignedUrl(imageService.createPresignedUrl(imageId));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
