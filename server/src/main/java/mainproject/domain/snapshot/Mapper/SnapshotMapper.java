package mainproject.domain.snapshot.Mapper;

import mainproject.domain.snapshot.Dto.SnapshotPostDto;
import mainproject.domain.snapshot.Dto.SnapshotResponseDto;
import mainproject.domain.snapshot.Entity.Snapshot;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SnapshotMapper {
    Snapshot snapshotPostDtoToSnapshot(SnapshotPostDto snapshotPostDto);

    @Mapping(source = "challenger.member.id", target = "memberId")
    @Mapping(source = "challenger.challenge.challengeId", target = "challengeId")
    SnapshotResponseDto snapshotToSnapshotResponseDto(Snapshot snapshot);

    List<SnapshotResponseDto> snapshotsToSnapshotResponseDtos(List<Snapshot> snapshots);
}
