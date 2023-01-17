package mainproject.domain.challenge.mapper;

import mainproject.domain.challenge.dto.ChallengePostDto;
import mainproject.domain.challenge.dto.ChallengeResponseDto;
import mainproject.domain.challenge.entity.Challenge;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChallengeMapper {
    Challenge challengePostDtoToChallenge(ChallengePostDto challengePostDto);

    @Mappings({
            @Mapping(source = "member.id", target = "hostMemberId"),
            @Mapping(source = "member.name", target = "hostMemberName"),
            // @Mapping(source = "member.profileImage", target = "profileImage")    // TODO: 이미지파일
    })
    ChallengeResponseDto challengeToChallengeResponseDto(Challenge challenge);

    List<ChallengeResponseDto> challengesToChallengeResponseDtos(List<Challenge> challenges);
}
