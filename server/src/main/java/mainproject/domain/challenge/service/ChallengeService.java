package mainproject.domain.challenge.service;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.domain.challenge.repository.ChallengeRepository;
import mainproject.domain.challenger.Repository.ChallengerRepository;
import mainproject.domain.member.entity.Member;
import mainproject.domain.member.service.MemberService;
import mainproject.global.category.Category;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final MemberService memberService;
    private final ChallengerRepository challengerRepository;

    public ChallengeService(ChallengeRepository challengeRepository, MemberService memberService, ChallengerRepository challengerRepository) {
        this.challengeRepository = challengeRepository;
        this.memberService = memberService;
        this.challengerRepository = challengerRepository;
    }

    // 챌린지 생성
    public Challenge createChallenge(Challenge challenge) {
        Member member = memberService.findVerifiedMember(challenge.getMember().getId());    // 회원여부 검증

        challenge.setMember(member);
        challenge.setChallengeStatus(ChallengeStatus.시작전);

        return challengeRepository.save(challenge);
    }

    // 챌린지 상세조회
    public Challenge findChallenge(long challengeId) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        return findVerifiedChallenge(challengeId);
    }

    // 챌린지 상세조회 : 회원의 챌린지 참가여부 확인
    public String checkChallenging(long challengeId, long memberId) {
        String challengerId = "M" + memberId + "_C" + challengeId;
        long duplication = challengerRepository.findById(challengerId).stream().count();
        if (duplication > 0) {
            return "참여중";
        }
        else {
            return "참여하기";
        }
    }

    // 챌린지 목록 최신 생성일 순 조회
    public Page<Challenge> findNewChallenges(Category category, int page) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        if (category == null) {
            return challengeRepository.findAll(PageRequest.of(page, 10, Sort.by("createdAt").descending()));
        } else {
            return challengeRepository.findByCategory(category, PageRequest.of(page, 10, Sort.by("createdAt").descending()));
        }
    }

    // 챌린지 목록 참여자순 조회
    public Page<Challenge> findHotChallenges(Category category, int page) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        if (category == null) {
            return challengeRepository.findAll(PageRequest.of(page, 10, Sort.by("challengerCount").descending()));
        } else {
            return challengeRepository.findByCategory(category, PageRequest.of(page, 10, Sort.by("challengerCount").descending()));
        }
    }

    // 챌린지 목록 최신 생성일 순 조회(전체 카테고리 조회 시 무한스크롤 적용X)
    public List<Challenge> findNewChallengesTemp() {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        return challengeRepository.findAll().stream()
                .sorted(Comparator.comparing(Challenge::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    // 챌린지 목록 참여자순 조회(전체 카테고리 조회 시 무한스크롤 적용X)
    public List<Challenge> findHotChallengesTemp() {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        return challengeRepository.findAll().stream()
                .sorted(Comparator.comparing(Challenge::getChallengerCount).reversed())
                .collect(Collectors.toList());
    }

    // 회원이 생성한 챌린지 조회
    public Page<Challenge> findCreateChallenges(long memberId, int page) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        List<Challenge> challenges = challengeRepository.findByMember_Id(memberId).stream()
                .sorted(Comparator.comparing(Challenge::getChallengeStatus) // 1차 정렬: 진행중인 챌린지, 시작 전 챌린지, 종료된 챌린지 순서로 정렬
                        .thenComparing(Challenge::getCreatedAt))    // 2차 정렬: 같은 상태의 챌린지 내에서 생성일 순으로 정렬
                .collect(Collectors.toList());

        PageRequest pageRequest = PageRequest.of(page, 10);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), challenges.size());

        return new PageImpl<>(challenges.subList(start, end), pageRequest, challenges.size());
    }

    // 챌린지 검색(제목+내용) - 검색결과는 인기순(참여자순)으로 출력
    public Page<Challenge> searchChallenges(String query, int page) {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        String[] words = query.split(" ");
        List<Challenge> results = new ArrayList<>();

        for (String w : words) {
            List<Challenge> result =
                    challengeRepository.findAll().stream()
                            .filter(c -> c.getTitle().contains(w) || c.getContent().contains(w))
                            .collect(Collectors.toList());
            results.addAll(result);
        }

        results = results.stream()
                .sorted(Comparator.comparing(Challenge::getChallengerCount).reversed())
                .collect(Collectors.toList());

        PageRequest pageRequest = PageRequest.of(page, 10);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), results.size());

        return new PageImpl<>(results.subList(start, end), pageRequest, results.size());
    }

    // 챌린지 삭제
    public void deleteChallenge(long challengeId) throws BusinessLogicException {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경

        Challenge challenge = verifyNotStartedChallenge(challengeId);   // 챌린지 존재여부, 시작 전 여부 검증

        if (challenge.getChallengerCount() != 0) {
            throw new BusinessLogicException(ExceptionCode.CHALLENGER_ALREADY_EXISTS);
        } else {
            challengeRepository.delete(challenge);
        }
    }

    // 현재 날짜에 맞춰 챌린지 상태 변경
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

    // 챌린지 존재여부 검증
    public Challenge findVerifiedChallenge(long challengeId) {
        Optional<Challenge> optionalChallenge = challengeRepository.findById(challengeId);

        return optionalChallenge.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
    }

    // 챌린지 시작 전 여부 검증(챌린지 신청, 삭제 시)
    public Challenge verifyNotStartedChallenge(long challengeId) throws BusinessLogicException {
        updateChallengeStatus();    // 현재 날짜에 맞춰 챌린지 상태 변경
        Challenge findChallenge = findVerifiedChallenge(challengeId); // 챌린지 존재여부 검증

        // 챌린지 시작 전 여부 검증
        if (!findChallenge.getChallengeStatus().equals(ChallengeStatus.시작전)) {
            throw new BusinessLogicException(ExceptionCode.CHALLENGE_ALREADY_STARTED);
        }

        return findChallenge;
    }

    public boolean checkMember(Member principal, long challengeId) {
        Optional<Challenge> optionalChallenge = challengeRepository.findById(challengeId);

        return optionalChallenge.isPresent()
                && optionalChallenge.get().getMember().getEmail().equals(principal.getEmail());
    }
}
