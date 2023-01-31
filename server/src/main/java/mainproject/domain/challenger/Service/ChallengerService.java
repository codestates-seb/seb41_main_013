package mainproject.domain.challenger.Service;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.domain.challenge.service.ChallengeService;
import mainproject.domain.challenger.Entity.Challenger;
import mainproject.domain.challenger.Repository.ChallengerRepository;
import mainproject.domain.member.entity.Member;
import mainproject.domain.member.service.MemberService;
import mainproject.global.exception.BusinessLogicException;
import mainproject.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChallengerService {
    private final ChallengerRepository challengerRepository;
    private final MemberService memberService;
    private final ChallengeService challengeService;

    public ChallengerService(ChallengerRepository challengerRepository, MemberService memberService, ChallengeService challengeService) {
        this.challengerRepository = challengerRepository;
        this.memberService = memberService;
        this.challengeService = challengeService;
    }

    // 챌린지 참가
    public Challenger createChallenger(Challenger challenger) throws BusinessLogicException {
        // 회원여부 검증
        long memberId = challenger.getMember().getId();
        Member member = memberService.findVerifiedMember(memberId);

        // 챌린지 존재여부, 시작 전 여부 검증
        long challengeId = challenger.getChallenge().getChallengeId();
        Challenge challenge = challengeService.verifyNotStartedChallenge(challengeId);

        // 회원이 이미 참가 중인 챌린지인지 검증
        String challengerId = "M" + memberId + "_C" + challengeId;
        long duplication = challengerRepository.findById(challengerId).stream().count();
        if (duplication > 0) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_START_CHALLENGE);
        }

        challenger.setMember(member);
        challenger.setChallenge(challenge);
        challenger.getChallenge().setChallengerCount(challenge.getChallengerCount() + 1);   // 참가자 수 증가
        challenger.setChallengerId(challengerId);
        return challengerRepository.save(challenger);
    }

    // 회원이 참가 중인 챌린지 조회
    public List<Challenger> findChallengingChallenges(long memberId) {
        challengeService.updateChallengeStatus();   // 현재 날짜에 맞춰 챌린지 상태 변경

        return challengerRepository.findByMember_Id(memberId).stream()
                .filter(c -> !c.getChallenge().getChallengeStatus().equals(ChallengeStatus.종료))
                .collect(Collectors.toList());
    }

    // 회원이 참가했던 챌린지 조회
    public List<Challenger> findChallengedChallenges(long memberId) {
        challengeService.updateChallengeStatus();   // 현재 날짜에 맞춰 챌린지 상태 변경

        return challengerRepository.findByMember_Id(memberId).stream()
                .filter(c -> c.getChallenge().getChallengeStatus().equals(ChallengeStatus.종료))
                .collect(Collectors.toList());
    }

    // 회원이 참가한 챌린지인지 검증
    public Challenger findVerifiedChallenger(long memberId, long challengeId) {
        memberService.findVerifiedMember(memberId); // 회원여부 검증
        challengeService.findVerifiedChallenge(challengeId);    // 챌린지 존재여부 검증

        String challengerId = "M" + memberId + "_C" + challengeId;
        Optional<Challenger> optionalChallenger = challengerRepository.findById(challengerId);

        return optionalChallenger.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGER_NOT_FOUND));
    }

    public boolean checkMember(Member principal, long memberId) {
        List<Challenger> optionalChallenger = challengerRepository.findByMember_Id(memberId);

        return !optionalChallenger.isEmpty()
                && optionalChallenger.stream().anyMatch(c -> !c.getMember().getEmail().equals(principal.getEmail()));
    }
}
