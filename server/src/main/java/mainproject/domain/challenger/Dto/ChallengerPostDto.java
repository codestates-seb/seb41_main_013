package mainproject.domain.challenger.Dto;

import lombok.Data;
import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.member.entity.Member;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class ChallengerPostDto {
    @NotNull
    @Positive
    private long memberId;

    public Member getMember() {
        Member member = new Member();
        member.setId(memberId);
        return member;
    }

    @NotNull
    @Positive
    private long challengeId;

    public Challenge getChallenge() {
        Challenge challenge = new Challenge();
        challenge.setChallengeId(challengeId);
        return challenge;
    }
}
