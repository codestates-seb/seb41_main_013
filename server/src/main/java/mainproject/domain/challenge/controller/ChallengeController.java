package mainproject.domain.challenge.controller;

import mainproject.domain.challenge.dto.ChallengePostDto;
import mainproject.domain.challenge.dto.ChallengeResponseDto;
import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.mapper.ChallengeMapper;
import mainproject.domain.challenge.service.ChallengeService;
import mainproject.global.category.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/challenges")
@Validated
public class ChallengeController {
    private final ChallengeService challengeService;
    private final ChallengeMapper mapper;

    public ChallengeController(ChallengeService challengeService, ChallengeMapper mapper) {
        this.challengeService = challengeService;
        this.mapper = mapper;
    }

    // 챌린지 생성
    @PostMapping
    public ResponseEntity postChallenge(@Valid @RequestBody ChallengePostDto challengePostDto) {
        Challenge challenge = challengeService.createChallenge(mapper.challengePostDtoToChallenge(challengePostDto));

        ChallengeResponseDto response = mapper.challengeToChallengeResponseDto(challenge);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 챌린지 목록 최신순 조회
    @GetMapping("/new")
    public ResponseEntity getNewChallenges(@RequestParam @Nullable Category category) {
        List<Challenge> challenges = challengeService.findNewChallenges(category);

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    // 챌린지 목록 참여자순 조회
    @GetMapping("/hot")
    public ResponseEntity getHotChallenges(@RequestParam @Nullable Category category) {
        List<Challenge> challenges = challengeService.findNewChallenges(category);

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 회원이 생성한 챌린지 조회 TODO: 매핑 필요

    // 챌린지 검색(제목+내용)

    // 챌린지 시작, 종료 TODO: 사용자가 입력한 시간에 따라 자동 업데이트 구현 필요

    // 챌린지 삭제

}
