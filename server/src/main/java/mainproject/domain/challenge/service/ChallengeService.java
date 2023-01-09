package mainproject.domain.challenge.service;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.domain.challenge.repository.ChallengeRepository;
import mainproject.global.category.Category;
import org.springframework.stereotype.Service;

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

        return challengeRepository.save(challenge);
    }

    // 챌린지 목록 최신순 조회
    public List<Challenge> findNewChallenges(Category category) {
        if (category == null) {
            return challengeRepository.findAll().stream()
                    .filter(s -> s.getChallengeStatus().equals(ChallengeStatus.시작전))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())
                    .collect(Collectors.toList());
        }
        else {
            return challengeRepository.findAllByCategory(category).stream()
                    .filter(s -> s.getChallengeStatus().equals(ChallengeStatus.시작전))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())
                    .collect(Collectors.toList());
        }
    }

    // 챌린지 목록 참여자순 조회
    public List<Challenge> findHotChallenges(Category category) {
        if (category == null) {
            return challengeRepository.findAll().stream()
                    .filter(s -> s.getChallengeStatus().equals(ChallengeStatus.시작전))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())  // TODO: 매핑 후 Id -> 참여자 변경
                    .collect(Collectors.toList());
        }
        else {
            return challengeRepository.findAllByCategory(category).stream()
                    .filter(s -> s.getChallengeStatus().equals(ChallengeStatus.시작전))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())  // TODO: 매핑 후 Id -> 참여자 변경
                    .collect(Collectors.toList());
        }
    }

    // 회원이 생성한 챌린지 조회 TODO: 매핑 필요

    // 챌린지 검색(제목+내용)

    // 챌린지 시작, 종료 TODO: 사용자가 입력한 시간에 따라 자동 업데이트 구현 필요


    // 챌린지 삭제
}
