package mainproject.domain.snapshot.Dto;

import lombok.Data;
import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenger.Entity.Challenger;
import mainproject.domain.member.entity.Member;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class SnapshotPostDto {
    @NotNull
    @Positive
    private long memberId;

    @NotNull
    @Positive
    private long challengeId;

    public Challenger getChallenger() {
        Challenger challenger = new Challenger();

        Member member = new Member();
        member.setId(memberId);
        challenger.setMember(member);

        Challenge challenge = new Challenge();
        challenge.setChallengeId(challengeId);
        challenger.setChallenge(challenge);

        return challenger;
    }

    // private Image snapshotImage;  // TODO: 이미지파일
}
