package mainproject.domain.challenge.service;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.domain.challenge.repository.ChallengeRepository;
import mainproject.domain.member.service.MemberService;
import mainproject.global.category.Category;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final MemberService memberService;

    public ChallengeService(ChallengeRepository challengeRepository, MemberService memberService) {
        this.challengeRepository = challengeRepository;
        this.memberService = memberService;
    }

    // 챌린지 생성
    public Challenge createChallenge(Challenge challenge) {
        // 회원여부 검증
        memberService.findVerifiedMember(challenge.getMember().getId());

        challenge.setChallengeStatus(ChallengeStatus.시작전);

        return challengeRepository.save(challenge);
    }

    // 챌린지 목록 최신 생성일 순 조회
    public List<Challenge> findNewChallenges(Category category) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        if (category == null) {
            return challengeRepository.findByChallengeStatus(ChallengeStatus.시작전).stream()
                    .sorted(Comparator.comparing(Challenge::getCreatedAt).reversed())
                    .collect(Collectors.toList());
        }
        else {
            return challengeRepository.findByChallengeStatus(ChallengeStatus.시작전).stream()
                    .filter(c -> c.getCategory().equals(category))
                    .sorted(Comparator.comparing(Challenge::getCreatedAt).reversed())
                    .collect(Collectors.toList());
        }
    }

    // 챌린지 목록 참여자순 조회
    public List<Challenge> findHotChallenges(Category category) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        if (category == null) {
            return challengeRepository.findByChallengeStatus(ChallengeStatus.시작전).stream()
                    .sorted(Comparator.comparing(Challenge::getCreatedAt).reversed())  // TODO: 매핑 후 생성일 -> 참여자수 변경
                    .collect(Collectors.toList());
        }
        else {
            return challengeRepository.findByChallengeStatus(ChallengeStatus.시작전).stream()
                    .filter(c -> c.getCategory().equals(category))
                    .sorted(Comparator.comparing(Challenge::getCreatedAt).reversed())  // TODO: 매핑 후 생성일 -> 참여자수 변경
                    .collect(Collectors.toList());
        }
    }

    // 회원이 생성한 챌린지 조회
    public List<Challenge> findCreateChallenges(long memberId) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        return challengeRepository.findByMember_Id(memberId).stream()
                .sorted(Comparator.comparing(Challenge::getChallengeStatus) // 1차 정렬: 진행중인 챌린지, 시작 전 챌린지, 종료된 챌린지 순서로 정렬
                        .thenComparing(Challenge::getCreatedAt))    // 2차 정렬: 같은 상태의 챌린지 내에서 생성일 순으로 정렬
                .collect(Collectors.toList());
    }

    // 챌린지 검색(제목+내용) - 검색결과는 인기순으로 출력
    public List<Challenge> searchChallenges(String query) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        String[] words = query.split(" ");
        List<Challenge> results = new ArrayList<>();

        for (String w : words) {
            List<Challenge> result =
                    challengeRepository.findByChallengeStatus(ChallengeStatus.시작전).stream()
                            .filter(c -> c.getTitle().contains(w) || c.getContent().contains(w))
                            .collect(Collectors.toList());
            results.addAll(result);
        }

        // TODO: 매핑 후 생성일 -> 참여자수 변경
        return results.stream().sorted(Comparator.comparing(Challenge::getCreatedAt).reversed()).collect(Collectors.toList());
    }

    // 챌린지 삭제
    public ResponseEntity deleteChallenge(long challengeId) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        Optional<Challenge> optionalChallenge = challengeRepository.findById(challengeId);
        Challenge challenge = optionalChallenge.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));

        if (challenge.getChallengeStatus() != ChallengeStatus.시작전) {    // TODO: 매핑 후 "&& 참여자 == 0" 조건 추가)
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
        List<Challenge> beforeStartedChallenges = challengeRepository.findByChallengeStatus(ChallengeStatus.시작전);

        beforeStartedChallenges.stream()
                .filter(c -> !c.getStartAt().isAfter(LocalDate.now()))
                .forEach(c -> c.setChallengeStatus(ChallengeStatus.진행중));

        challengeRepository.saveAll(beforeStartedChallenges);

        // 종료 날짜가 지나면 챌린지 종료
        List<Challenge> progressingChallenges = challengeRepository.findByChallengeStatus(ChallengeStatus.진행중);

        progressingChallenges.stream()
                .filter(c -> c.getEndAt().isBefore(LocalDate.now()))
                .forEach(c -> c.setChallengeStatus(ChallengeStatus.종료));

        challengeRepository.saveAll(progressingChallenges);
    }
}
