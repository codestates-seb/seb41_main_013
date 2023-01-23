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
            // @Mapping(source = "member.profileImage", target = "profileImage"), // TODO: 이미지파일
            @Mapping(source = "challenge.challengeId", target = "challengeId"),
            @Mapping(source = "challenge.title", target = "challengeName")
            // @Mapping(source = "challenge.challengeImage", target = "challengeImage")  // TODO: 이미지파일
    })
    SnapshotResponseDto snapshotToSnapshotResponseDto(Snapshot snapshot);

    List<SnapshotResponseDto> snapshotsToSnapshotResponseDtos(List<Snapshot> snapshots);
}
