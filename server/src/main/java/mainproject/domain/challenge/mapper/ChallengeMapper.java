package mainproject.domain.challenge.mapper;

import mainproject.domain.challenge.dto.ChallengePostDto;
import mainproject.domain.challenge.dto.ChallengeResponseDto;
import mainproject.domain.challenge.entity.Challenge;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChallengeMapper {
    Challenge challengePostDtoToChallenge(ChallengePostDto challengePostDto);
    ChallengeResponseDto challengeToChallengeResponseDto(Challenge challenge);
    List<ChallengeResponseDto> challengesToChallengeResponseDtos(List<Challenge> challenges);
}
