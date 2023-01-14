package mainproject.domain.challenger.Service;

import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.domain.challenge.service.ChallengeService;
import mainproject.domain.challenger.Entity.Challenger;
import mainproject.domain.challenger.Repository.ChallengerRepository;
import mainproject.domain.member.service.MemberService;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public Challenger createChallenger(Challenger challenger) {
        memberService.findVerifiedMember(challenger.getMember().getId());    // 회원여부 검증
        challengeService.verifyOpenedChallenge(challenger.getChallenge().getChallengeId()); // 챌린지 존재여부, 시작 전 여부 검증

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
}
