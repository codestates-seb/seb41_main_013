package mainproject.domain.challenger.Mapper;

import mainproject.domain.challenger.Dto.ChallengerDetailResponseDto;
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

        int snapshotCount = challenger.getSnapshotCount();
        int frequency = challenger.getChallenge().getFrequency().ordinal() + 1;
        int dayCount = challenger.getChallenge().getChallengeDay();
        int progress = (snapshotCount * 7 * 100) / (frequency * dayCount);
        if (progress > 100) {
            progress = 100;
        }
        challengerResponseDto.setProgress(progress);

        return challengerResponseDto;
    }

    public ChallengerDetailResponseDto challengerToChallengerDetailResponseDto(Challenger challenger) {
        if (challenger == null) {
            return null;
        }

        ChallengerDetailResponseDto challengerDetailResponseDto = new ChallengerDetailResponseDto();

        challengerDetailResponseDto.setMemberId(challenger.getMember().getId());
        challengerDetailResponseDto.setMemberName(challenger.getMember().getName());
        challengerDetailResponseDto.setProfileImageId(challenger.getMember().getImage().getImageId());
        challengerDetailResponseDto.setChallengeId(challenger.getChallenge().getChallengeId());
        challengerDetailResponseDto.setChallengeName(challenger.getChallenge().getTitle());
        challengerDetailResponseDto.setChallengeImageId(challenger.getChallenge().getImage().getImageId());
        challengerDetailResponseDto.setCategory(challenger.getChallenge().getCategory());
        challengerDetailResponseDto.setStartAt(challenger.getChallenge().getStartAt());
        challengerDetailResponseDto.setEndAt(challenger.getChallenge().getEndAt());
        challengerDetailResponseDto.setFrequency(challenger.getChallenge().getFrequency());
        challengerDetailResponseDto.setSnapshotStartAt(challenger.getChallenge().getSnapshotStartAt());
        challengerDetailResponseDto.setSnapshotEndAt(challenger.getChallenge().getSnapshotEndAt());
        challengerDetailResponseDto.setChallengerCount(challenger.getChallenge().getChallengerCount());
        challengerDetailResponseDto.setChallengerId(challenger.getChallengerId());
        challengerDetailResponseDto.setCreatedAt(challenger.getCreatedAt());
        challengerDetailResponseDto.setProgress(challenger.getSnapshotCount() * 100 / challenger.getChallenge().getChallengeDay());

        return challengerDetailResponseDto;
    }

    public List<ChallengerDetailResponseDto> challengersToChallengerDetailResponseDtos(List<Challenger> challengers) {
        if (challengers == null) {
            return null;
        }

        List<ChallengerDetailResponseDto> list = new ArrayList<>(challengers.size());
        for (Challenger challenger : challengers) {
            list.add(challengerToChallengerDetailResponseDto(challenger));
        }

        return list;
    }
}
