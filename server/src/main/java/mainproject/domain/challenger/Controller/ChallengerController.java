package mainproject.domain.challenger.Controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import mainproject.domain.challenger.Dto.ChallengerDetailResponseDto;
import mainproject.domain.challenger.Dto.ChallengerPostDto;
import mainproject.domain.challenger.Dto.ChallengerResponseDto;
import mainproject.domain.challenger.Entity.Challenger;
import mainproject.domain.challenger.Mapper.ChallengerMapper;
import mainproject.domain.challenger.Service.ChallengerService;
import mainproject.domain.image.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping(value = "api/challengers")
@Validated
@Api(tags = "챌린지 참가, 참가 챌린지 조회")
public class ChallengerController {
    private final ChallengerService challengerService;
    private final ChallengerMapper mapper;
    private final ImageService imageService;

    public ChallengerController(ChallengerService challengerService, ChallengerMapper mapper, ImageService imageService) {
        this.challengerService = challengerService;
        this.mapper = mapper;
        this.imageService = imageService;
    }

    // 챌린지 참가
    @ApiOperation(value = "챌린지 참가")
    @PostMapping
    public ResponseEntity postChallenger(@ApiParam(name = "회원번호, 참가할 챌린지번호 입력", value = postChallengerDescription, required = true) @RequestBody ChallengerPostDto request) {
        Challenger challenger = challengerService.createChallenger(mapper.challengerPostDtoToChallenger(request));

        ChallengerResponseDto response = mapper.challengerToChallengerResponseDto(challenger);

        response.setProfileImageUrl(imageService.createPresignedUrl(challenger.getMember().getImage().getImageId()));
        response.setChallengeImageUrl(imageService.createPresignedUrl(challenger.getChallenge().getImage().getImageId()));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    final String postChallengerDescription = "memberId: 회원번호 (로그인 후 챌린지 신청 가능)" + "\r\n" +
            "challengeId: 챌린지번호 (시작 전 상태의 챌린지만 신청 가능)";

    // 회원이 참가 중인 챌린지 조회
    @ApiOperation(value = "회원이 참가 중인 챌린지 조회")
    @ApiParam(name = "회원번호 입력", value = "회원번호 입력", required = true)
    @GetMapping("/{member-id}/challenging")
    public ResponseEntity getChallengingChallenges(@PathVariable("member-id") @Positive long memberId) {
        List<Challenger> challengers = challengerService.findChallengingChallenges(memberId);

        List<ChallengerDetailResponseDto> response = mapper.challengersToChallengerDetailResponseDtos(challengers);

        for (int i = 0; i < response.size(); i++) {
            response.get(i).setProfileImageUrl(imageService.createPresignedUrl(challengers.get(i).getMember().getImage().getImageId()));
            response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challengers.get(i).getChallenge().getImage().getImageId()));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 회원이 참가했던 챌린지 조회
    @ApiOperation(value = "회원이 참가했던 챌린지 조회")
    @ApiParam(name = "회원번호 입력", value = "회원번호 입력", required = true)
    @GetMapping("/{member-id}/challenged")
    public ResponseEntity getChallengedChallenges(@PathVariable("member-id") @Positive long memberId) {
        List<Challenger> challengers = challengerService.findChallengedChallenges(memberId);

        List<ChallengerDetailResponseDto> response = mapper.challengersToChallengerDetailResponseDtos(challengers);

        for (int i = 0; i < response.size(); i++) {
            response.get(i).setProfileImageUrl(imageService.createPresignedUrl(challengers.get(i).getMember().getImage().getImageId()));
            response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challengers.get(i).getChallenge().getImage().getImageId()));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
