package mainproject.domain.challenge.service;

import mainproject.domain.challenge.dto.ChallengeResponseDto;
import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.domain.challenge.repository.ChallengeRepository;
import mainproject.global.category.Category;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;

    public ChallengeService(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    // 챌린지 생성
    public Challenge createChallenge(Challenge challenge) {
        // 회원여부 검증 (TODO: 매핑 후 사용)
        // Member createMember = memberService.findVerifiedMember(challenge.getMember().getMemberId());

        challenge.setChallengeStatus(ChallengeStatus.시작전);

        return challengeRepository.save(challenge);
    }

    // 챌린지 목록 최신순 조회
    public List<Challenge> findNewChallenges(Category category) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        if (category == null) {
            return challengeRepository.findAllByChallengeStatus(ChallengeStatus.시작전).stream()
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())
                    .collect(Collectors.toList());
        }
        else {
            return challengeRepository.findAllByChallengeStatus(ChallengeStatus.시작전).stream()
                    .filter(c -> c.getCategory().equals(category))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())
                    .collect(Collectors.toList());
        }
    }

    // 챌린지 목록 참여자순 조회
    public List<Challenge> findHotChallenges(Category category) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        if (category == null) {
            return challengeRepository.findAllByChallengeStatus(ChallengeStatus.시작전).stream()
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())  // TODO: 매핑 후 Id -> 참여자수 변경
                    .collect(Collectors.toList());
        }
        else {
            return challengeRepository.findAllByChallengeStatus(ChallengeStatus.시작전).stream()
                    .filter(c -> c.getCategory().equals(category))
                    .sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId())  // TODO: 매핑 후 Id -> 참여자수 변경
                    .collect(Collectors.toList());
        }
    }

    // 회원이 생성한 챌린지 조회 TODO: 매핑 필요

    // 챌린지 검색(제목+내용) - 인기순 출력
    public List<Challenge> searchChallenges(String query) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        String[] words = query.split(" ");
        List<Challenge> results = new ArrayList<>();

        for (String w : words) {
            List<Challenge> result =
                    challengeRepository.findAllByChallengeStatus(ChallengeStatus.시작전).stream()
                            .filter(c -> c.getTitle().contains(w) || c.getContent().contains(w))
                            .collect(Collectors.toList());
            result.forEach(r -> results.add(r));
        }

        // TODO: 매핑 후 Id -> 참여자수 변경
        results.stream().sorted((c1, c2) -> (int) c2.getChallengeId() - (int) c1.getChallengeId());

        return results;
    }

    // 챌린지 삭제
    public ResponseEntity deleteChallenge(long challengeId) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        Optional<Challenge> optionalChallenge = challengeRepository.findById(challengeId);
        Challenge challenge = optionalChallenge.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));

        if (challenge.getChallengeStatus() != ChallengeStatus.시작전) {    // TODO: 매핑 이후 - && 참여자 == 0)
            throw new BusinessLogicException(ExceptionCode.CHALLENGE_DELETE_NOT_ALLOWED);
        }
        else {
            challengeRepository.delete(challenge);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
    }

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
}
