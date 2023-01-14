package mainproject.domain.challenger.Mapper;

import mainproject.domain.challenger.Dto.ChallengerPostDto;
import mainproject.domain.challenger.Dto.ChallengerResponseDto;
import mainproject.domain.challenger.Entity.Challenger;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChallengerMapper {
    Challenger challengerPostDtoToChallenger(ChallengerPostDto challengerPostDto);

    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "challenge.challengeId", target = "challengeId")
    ChallengerResponseDto challengerToChallengerResponseDto(Challenger challenger);

    List<ChallengerResponseDto> challengersToChallengerResponseDtos(List<Challenger> challengers);
}
