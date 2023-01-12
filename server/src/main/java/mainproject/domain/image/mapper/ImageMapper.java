package mainproject.domain.image.mapper;


import mainproject.domain.image.dto.ImageResponseDto;
import mainproject.domain.image.entity.Image;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    ImageResponseDto imageToImageResponseDto(Image image);
}
