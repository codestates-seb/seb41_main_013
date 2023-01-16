package mainproject.domain.challenger.Mapper;

import mainproject.domain.challenger.Dto.ChallengerPostDto;
import mainproject.domain.challenger.Dto.ChallengerResponseDto;
import mainproject.domain.challenger.Entity.Challenger;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChallengerMapper {
    Challenger challengerPostDtoToChallenger(ChallengerPostDto challengerPostDto);

    @Mappings({
            @Mapping(source = "member.id", target = "memberId"),
            @Mapping(source = "member.name", target = "memberName"),
            // @Mapping(source = "member.profileImage", target = "profileImage"),   // TODO: 이미지파일
            @Mapping(source = "challenge.challengeId", target = "challengeId"),
            @Mapping(source = "challenge.title", target = "challengeName")
            // @Mapping(source = "challenge.challengeImage", target = "challengeImage"),    // TODO: 이미지파일
            // TODO: 참가자 수
    })
    ChallengerResponseDto challengerToChallengerResponseDto(Challenger challenger);

    List<ChallengerResponseDto> challengersToChallengerResponseDtos(List<Challenger> challengers);
}
