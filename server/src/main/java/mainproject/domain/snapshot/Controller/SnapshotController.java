package mainproject.domain.snapshot.Controller;

import mainproject.domain.snapshot.Dto.SnapshotPostDto;
import mainproject.domain.snapshot.Dto.SnapshotResponseDto;
import mainproject.domain.snapshot.Entity.Snapshot;
import mainproject.domain.snapshot.Mapper.SnapshotMapper;
import mainproject.domain.snapshot.Service.SnapshotService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/snapshots")
public class SnapshotController {
    private final SnapshotService snapshotService;
    private final SnapshotMapper mapper;

    public SnapshotController(SnapshotService snapshotService, SnapshotMapper mapper) {
        this.snapshotService = snapshotService;
        this.mapper = mapper;
    }

    // 참가 중인 챌린지에 인증사진 등록
    @PostMapping
    public ResponseEntity postSnapshot(@RequestBody SnapshotPostDto request) {
        Snapshot snapshot = snapshotService.createSnapshot(mapper.snapshotPostDtoToSnapshot(request));

        SnapshotResponseDto response = mapper.snapshotToSnapshotResponseDto(snapshot);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 참가 중인 챌린지의 모든 참가자들의 인증사진 최신순 조회

}
