package mainproject.domain.challenge.service;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.domain.challenge.repository.ChallengeRepository;
import mainproject.global.category.Category;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;

    public ChallengeService(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    // 챌린지 생성
    public Challenge createChallenge(Challenge challenge) {
        // 존재하는 회원인지 확인 (TODO: 매핑 후 사용)
        // Member createMember = memberService.findVerifiedMember(challenge.getMember().getMemberId());

        challenge.setChallengeStatus(ChallengeStatus.시작전);

        return challengeRepository.save(challenge);
    }

    // 챌린지 목록 최신순 조회
    public List<Challenge> findNewChallenges(Category category) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        if (category == null) {
            return challengeRepository.findAll().stream()
                    .filter(c -> c.getChallengeStatus().equals(ChallengeStatus.시작전))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())
                    .collect(Collectors.toList());
        }
        else {
            return challengeRepository.findAllByCategory(category).stream()
                    .filter(c -> c.getChallengeStatus().equals(ChallengeStatus.시작전))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())
                    .collect(Collectors.toList());
        }
    }

    // 챌린지 목록 참여자순 조회
    public List<Challenge> findHotChallenges(Category category) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        if (category == null) {
            return challengeRepository.findAll().stream()
                    .filter(c -> c.getChallengeStatus().equals(ChallengeStatus.시작전))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())  // TODO: 매핑 후 Id -> 참여자수 변경
                    .collect(Collectors.toList());
        }
        else {
            return challengeRepository.findAllByCategory(category).stream()
                    .filter(c -> c.getChallengeStatus().equals(ChallengeStatus.시작전))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())  // TODO: 매핑 후 Id -> 참여자수 변경
                    .collect(Collectors.toList());
        }
    }

    // 회원이 생성한 챌린지 조회 TODO: 매핑 필요

    // 챌린지 검색(제목+내용)
    // public List<Challenge> searchChallenges(Search search) {}

    // 챌린지 시작, 종료
    public void updateChallengeStatus() {
        // 시작 날짜가 되면 챌린지 진행
        List<Challenge> notStartedChallenges = challengeRepository.findAllByChallengeStatus(ChallengeStatus.시작전);
        notStartedChallenges.stream()
                .filter(c -> !c.getStartAt().isAfter(LocalDate.now()))
                .forEach(c -> c.setChallengeStatus(ChallengeStatus.진행중));
        notStartedChallenges.forEach(c -> challengeRepository.save(c));

        // 종료 날짜가 지나면 챌린지 종료
        List<Challenge> progressingChallenges = challengeRepository.findAllByChallengeStatus(ChallengeStatus.진행중);
        progressingChallenges.stream()
                .filter(c -> c.getEndAt().isBefore(LocalDate.now()))
                .forEach(c -> c.setChallengeStatus(ChallengeStatus.종료));
        progressingChallenges.forEach(c -> challengeRepository.save(c));
    }

    // 챌린지 삭제
}
