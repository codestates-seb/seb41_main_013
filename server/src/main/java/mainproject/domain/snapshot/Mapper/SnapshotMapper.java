package mainproject.domain.snapshot.Mapper;

import mainproject.domain.snapshot.Dto.SnapshotPostDto;
import mainproject.domain.snapshot.Dto.SnapshotResponseDto;
import mainproject.domain.snapshot.Entity.Snapshot;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SnapshotMapper {
    Snapshot snapshotPostDtoToSnapshot(SnapshotPostDto snapshotPostDto);

    @Mappings({
            @Mapping(source = "member.id", target = "memberId"),
            @Mapping(source = "member.name", target = "memberName"),
            @Mapping(source = "member.image.imageId", target = "profileImageId"),
            @Mapping(source = "challenge.challengeId", target = "challengeId"),
            @Mapping(source = "challenge.title", target = "challengeName"),
            @Mapping(source = "challenge.image.imageId", target = "challengeImageId"),
            @Mapping(source = "image.imageId", target = "snapshotImageId")
    })
    SnapshotResponseDto snapshotToSnapshotResponseDto(Snapshot snapshot);

    List<SnapshotResponseDto> snapshotsToSnapshotResponseDtos(List<Snapshot> snapshots);
}
