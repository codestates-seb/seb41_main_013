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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
        long memberId = snapshot.getMember().getId();
        long challengeId = snapshot.getChallenge().getChallengeId();
        Challenger challenger = challengerService.findVerifiedChallenger(memberId, challengeId);
        Member member = challenger.getMember();
        Challenge challenge = challenger.getChallenge();

        // 진행 중인 챌린지인지 검증
        challengeService.updateChallengeStatus();   // 현재 날짜에 맞춰 챌린지 상태 변경
        if (challenge.getChallengeStatus().equals(ChallengeStatus.종료)) { // TODO: 테스트를 위해 변경. 배포 시 삭제 후 주석 if문 활성화
        //if (!challenge.getChallengeStatus().equals(ChallengeStatus.진행중)) {
            throw new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_IN_PROGRESS);
        }

        // 오늘 이미 인증한 회원인지 검증
        String challengerId = challenger.getChallengerId() + "_";
        int snapshotDate = Integer.valueOf(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        String snapshotId = challengerId + snapshotDate;
        if (snapshotRepository.findById(snapshotId).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SNAPSHOT_TODAY_ALREADY_EXISTS);
        }

        // 인증시간 검증
        if (LocalTime.now().isBefore(challenge.getSnapshotStartAt()) || LocalTime.now().isAfter(challenge.getSnapshotEndAt())) {
            throw new BusinessLogicException(ExceptionCode.TIME_UNAUTHORIZED);
        }

        // 빈도수 검증 - 월요일을 기준으로 회원의 인증사진 등록횟수가 챌린지 빈도수를 초과했는지 검증
        int frequency = challenge.getFrequency().ordinal() + 1;
        int dayOfWeek = LocalDate.now().getDayOfWeek().getValue();
        if (frequency < dayOfWeek) {
            while (dayOfWeek > 0) {
                dayOfWeek--;
                snapshotDate--;
                if (snapshotRepository.findById(challengerId + snapshotDate).isPresent()) {
                    frequency--;
                }
            }
            if (frequency == 0) {
                throw new BusinessLogicException(ExceptionCode.SNAPSHOT_FREQUENCY_EXCEEDED);
            }
        }


        challenger.setSnapshotCount(challenger.getSnapshotCount() + 1);   // 진행률 업데이트를 위해 인증일 수 증가

        snapshot.setMember(member);
        snapshot.setChallenge(challenge);
        snapshot.setSnapshotId(snapshotId);
        return snapshotRepository.save(snapshot);
    }

    // 챌린지의 모든 참가자들의 인증사진 최신순 조회
    public Page<Snapshot> findSnapshots(long challengeId, int page) {
        return snapshotRepository.findByChallenge_ChallengeId(challengeId, PageRequest.of(page, 30, Sort.by("createdAt").descending()));
    }
}
