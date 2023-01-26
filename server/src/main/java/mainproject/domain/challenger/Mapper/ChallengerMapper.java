package mainproject.domain.challenger.Mapper;

import mainproject.domain.challenger.Dto.ChallengerPostDto;
import mainproject.domain.challenger.Dto.ChallengerResponseDto;
import mainproject.domain.challenger.Entity.Challenger;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ChallengerMapper {
    public Challenger challengerPostDtoToChallenger(ChallengerPostDto challengerPostDto) {
        if (challengerPostDto == null) {
            return null;
        }

        Challenger challenger = new Challenger();

        challenger.setMember(challengerPostDto.getMember());
        challenger.setChallenge(challengerPostDto.getChallenge());

        return challenger;
    }

    public ChallengerResponseDto challengerToChallengerResponseDto(Challenger challenger) {
        if (challenger == null) {
            return null;
        }

        ChallengerResponseDto challengerResponseDto = new ChallengerResponseDto();

        challengerResponseDto.setMemberId(challenger.getMember().getId());
        challengerResponseDto.setMemberName(challenger.getMember().getName());
        challengerResponseDto.setProfileImageId(challenger.getMember().getImage().getImageId());
        challengerResponseDto.setChallengeId(challenger.getChallenge().getChallengeId());
        challengerResponseDto.setChallengeName(challenger.getChallenge().getTitle());
        challengerResponseDto.setChallengeImageId(challenger.getChallenge().getImage().getImageId());
        challengerResponseDto.setChallengerId(challenger.getChallengerId());
        challengerResponseDto.setCreatedAt(challenger.getCreatedAt());
        challengerResponseDto.setProgress(challenger.getSnapshotCount() * 100 / challenger.getChallenge().getChallengeDay());

        return challengerResponseDto;
    }

    public List<ChallengerResponseDto> challengersToChallengerResponseDtos(List<Challenger> challengers) {
        if (challengers == null) {
            return null;
        }

        List<ChallengerResponseDto> list = new ArrayList<>(challengers.size());
        for (Challenger challenger : challengers) {
            list.add(challengerToChallengerResponseDto(challenger));
        }

        return list;
    }
}
