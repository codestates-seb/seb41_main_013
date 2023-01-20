package mainproject.domain.snapshot.Controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import mainproject.domain.snapshot.Dto.SnapshotPostDto;
import mainproject.domain.snapshot.Dto.SnapshotResponseDto;
import mainproject.domain.snapshot.Entity.Snapshot;
import mainproject.domain.snapshot.Mapper.SnapshotMapper;
import mainproject.domain.snapshot.Service.SnapshotService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/snapshots")
@Api(tags = "인증사진 등록, 조회")
public class SnapshotController {
    private final SnapshotService snapshotService;
    private final SnapshotMapper mapper;

    public SnapshotController(SnapshotService snapshotService, SnapshotMapper mapper) {
        this.snapshotService = snapshotService;
        this.mapper = mapper;
    }

    // 참가 중인 챌린지에 인증사진 등록
    @ApiOperation(value = "참가 중인 챌린지에 인증사진 등록")
    @PostMapping
    public ResponseEntity postSnapshot(@ApiParam(name = "상세정보 입력", value = postSnapshotDescription, required = true)
                                           @RequestBody SnapshotPostDto request) {
        Snapshot snapshot = snapshotService.createSnapshot(mapper.snapshotPostDtoToSnapshot(request));

        SnapshotResponseDto response = mapper.snapshotToSnapshotResponseDto(snapshot);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    final String postSnapshotDescription = "memberId: 회원번호 (로그인 후 인증사진 등록 가능)" + "\r\n" +
            "challengeId: 챌린지번호 (회원이 참가 중인 챌린지에만 인증사진 등록 가능)";

    // 챌린지의 모든 참가자들의 인증사진 최신순 조회
    @ApiOperation(value = "챌린지의 모든 참가자들의 인증사진 최신순 조회")
    @ApiParam(name = "챌린지번호 입력", value = "챌린지번호 입력", required = true)
    @GetMapping("/{challenge-id}")
    public ResponseEntity getSnapshots(@PathVariable("challenge-id") @Positive long challengeId) {
        List<Snapshot> snapshots = snapshotService.findSnapshots(challengeId);

        List<SnapshotResponseDto> response = mapper.snapshotsToSnapshotResponseDtos(snapshots);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
