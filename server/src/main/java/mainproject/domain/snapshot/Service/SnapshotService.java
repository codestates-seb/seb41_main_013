package mainproject.domain.snapshot.Service;

import mainproject.domain.member.service.MemberService;
import mainproject.domain.snapshot.Entity.Snapshot;
import mainproject.domain.snapshot.Repository.SnapshotRepository;
import org.springframework.stereotype.Service;

@Service
public class SnapshotService {
    private final SnapshotRepository snapshotRepository;
    private final MemberService memberService;

    public SnapshotService(SnapshotRepository snapshotRepository, MemberService memberService) {
        this.snapshotRepository = snapshotRepository;
        this.memberService = memberService;
    }

    // 참가 중인 챌린지에 인증사진 등록
    public Snapshot createSnapshot(Snapshot snapshot) {
        // TODO: 회원 검증, 챌린지 검증, 참가중인 챌린지 검증, 인증시간 검증, 오늘 이미 인증했는지 검증(Id 활용)
        // memberService.findVerifiedMember(snapshot.getChallenger().getChallengerId());    // 회원여부 검증

        return snapshotRepository.save(snapshot);
    }

    // 참가 중인 챌린지의 모든 참가자들의 인증사진 최신순 조회

}
