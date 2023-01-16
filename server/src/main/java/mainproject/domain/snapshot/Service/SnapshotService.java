package mainproject.domain.snapshot.Service;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.domain.challenge.service.ChallengeService;
import mainproject.domain.challenger.Entity.Challenger;
import mainproject.domain.challenger.Service.ChallengerService;
import mainproject.domain.member.entity.Member;
import mainproject.domain.snapshot.Entity.Snapshot;
import mainproject.domain.snapshot.Repository.SnapshotRepository;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Service
public class SnapshotService {
    private final SnapshotRepository snapshotRepository;
    private final ChallengeService challengeService;
    private final ChallengerService challengerService;

    public SnapshotService(SnapshotRepository snapshotRepository, ChallengeService challengeService, ChallengerService challengerService) {
        this.snapshotRepository = snapshotRepository;
        this.challengeService = challengeService;
        this.challengerService = challengerService;
    }

    // 참가 중인 챌린지에 인증사진 등록
    public Snapshot createSnapshot(Snapshot snapshot) throws BusinessLogicException {
        // 회원이 참가 중인 챌린지인지 검증
        Member member = snapshot.getChallenger().getMember();
        Challenge challenge = snapshot.getChallenger().getChallenge();
        Challenger challenger = challengerService.findVerifiedChallenger(member.getId(), challenge.getChallengeId());

        // 진행 중인 챌린지인지 검증
        challengeService.updateChallengeStatus();   // 현재 날짜에 맞춰 챌린지 상태 변경
        if (challenger.getChallenge().getChallengeStatus().equals(ChallengeStatus.종료)) { // != 진행중. 테스트시 == 종료로 변경
            throw new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_IN_PROGRESS);
        }

        // 오늘 이미 인증한 회원인지 검증
        String snapshotDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String snapshotId = "M" + member.getId() + "_C" + challenge.getChallengeId() + "_" + snapshotDate;
        if (snapshotRepository.findById(snapshotId).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SNAPSHOT_TODAY_ALREADY_EXISTS);
        }

        // 인증시간 검증
        if (LocalTime.now().isBefore(challenger.getChallenge().getSnapshotStartAt()) || LocalTime.now().isAfter(challenger.getChallenge().getSnapshotEndAt())) {
            throw new BusinessLogicException(ExceptionCode.TIME_UNAUTHORIZED);
        }

        snapshot.setChallenger(challenger);
        snapshot.setSnapshotId(snapshotId);
        return snapshotRepository.save(snapshot);
    }

    // 참가 중인 챌린지의 모든 참가자들의 인증사진 최신순 조회

}
