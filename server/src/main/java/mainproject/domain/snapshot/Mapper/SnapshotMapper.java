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
            @Mapping(source = "challenger.member.id", target = "memberId"),
            @Mapping(source = "challenger.member.name", target = "memberName"),
            // @Mapping(source = "challenger.member.profileImage", target = "profileImage"), // TODO: 이미지파일
            @Mapping(source = "challenger.challenge.challengeId", target = "challengeId"),
            @Mapping(source = "challenger.challenge.title", target = "challengeName")
            // @Mapping(source = "challenger.challenge.challengeImage", target = "challengeImage"),  // TODO: 이미지파일
            // TODO: 참가자 수
    })
    SnapshotResponseDto snapshotToSnapshotResponseDto(Snapshot snapshot);

    List<SnapshotResponseDto> snapshotsToSnapshotResponseDtos(List<Snapshot> snapshots);
}
