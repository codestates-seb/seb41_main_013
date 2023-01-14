package mainproject.domain.challenger.Controller;

import mainproject.domain.challenger.Dto.ChallengerPostDto;
import mainproject.domain.challenger.Dto.ChallengerResponseDto;
import mainproject.domain.challenger.Entity.Challenger;
import mainproject.domain.challenger.Mapper.ChallengerMapper;
import mainproject.domain.challenger.Service.ChallengerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping(value = "api/challengers")
@Validated
public class ChallengerController {
    private final ChallengerService challengerService;

    private final ChallengerMapper mapper;

    public ChallengerController(ChallengerService challengerService, ChallengerMapper mapper) {
        this.challengerService = challengerService;
        this.mapper = mapper;
    }

    // 챌린지 참가
    @PostMapping
    public ResponseEntity postChallenger(@RequestBody ChallengerPostDto request) {
        Challenger challenger = challengerService.createChallenger(mapper.challengerPostDtoToChallenger(request));

        ChallengerResponseDto response = mapper.challengerToChallengerResponseDto(challenger);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 회원이 참가 중인 챌린지 조회
    @GetMapping("/{member-id}/challenging")
    public ResponseEntity getChallengingChallenges(@PathVariable("member-id") @Positive long memberId) {
        List<Challenger> challengers = challengerService.findChallengingChallenges(memberId);

        List<ChallengerResponseDto> response = mapper.challengersToChallengerResponseDtos(challengers);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 회원이 참가했던 챌린지 조회
    @GetMapping("/{member-id}/challenged")
    public ResponseEntity getChallengedChallenges(@PathVariable("member-id") @Positive long memberId) {
        List<Challenger> challengers = challengerService.findChallengedChallenges(memberId);

        List<ChallengerResponseDto> response = mapper.challengersToChallengerResponseDtos(challengers);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
