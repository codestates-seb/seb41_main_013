package mainproject.domain.snapshot.Dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.member.entity.Member;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class SnapshotPostDto {
    @NotNull
    @Positive
    @ApiModelProperty(required = true, example = "1")
    private long memberId;

    @ApiModelProperty(hidden = true)
    public Member getMember() {
        Member member = new Member();
        member.setId(memberId);
        return member;
    }

    @NotNull
    @Positive
    @ApiModelProperty(required = true, example = "1")
    private long challengeId;

    @ApiModelProperty(hidden = true)
    public Challenge getChallenge() {
        Challenge challenge = new Challenge();
        challenge.setChallengeId(challengeId);
        return challenge;
    }

    // private Image snapshotImage;  // TODO: 이미지파일
}
