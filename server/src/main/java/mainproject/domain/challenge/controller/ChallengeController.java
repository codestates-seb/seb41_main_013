package mainproject.domain.challenge.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.List;

@RestController
@RequestMapping(value = "/api/challenges")
@Validated
@Api(tags = "챌린지 생성, 조회, 삭제")
public class ChallengeController {
    private final ChallengeService challengeService;
    private final ChallengeMapper mapper;

    public ChallengeController(ChallengeService challengeService, ChallengeMapper mapper) {
        this.challengeService = challengeService;
        this.mapper = mapper;
    }

    // 챌린지 생성
    @ApiOperation(value = "챌린지 생성")
    @PostMapping
    public ResponseEntity postChallenge(@ApiParam(name = "챌린지 상세정보 입력", value = postChallengeDescription, required = true)
                                            @RequestBody ChallengePostDto request) {
        Challenge challenge = challengeService.createChallenge(mapper.challengePostDtoToChallenge(request));

        ChallengeResponseDto response = mapper.challengeToChallengeResponseDto(challenge);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    final String postChallengeDescription = "hostMemberId: 회원번호 (로그인 후 챌린지 생성 가능)" + "\r\n" +
            "category: 카테고리 (우리동네, 운동, 생활, 기타 중 입력)" + "\r\n" +
            "title: 챌린지 제목 (50자까지 입력 가능) " + "\r\n" +
            "content: 챌린지 설명 (500자까지 입력 가능) " + "\r\n" +
            "startAt: 챌린지 시작 날짜 예) 2023-02-01 (내일 이후부터 선택 가능)" + "\r\n" +
            "endAt: 챌린지 종료 날짜 (시작 날짜 이후로 설정 가능)" + "\r\n" +
            "frequency: 인증 빈도 (생략 가능, default = 매일)" + "\r\n" +
            "snapshotStartAt: 인증 시작 시간 예) 00:00:00 (생략 가능, default = 00:00:00)" + "\r\n" +
            "snapshotEndAt: 인증 종료 시간 (시작 시간 이후로 설정 가능, 생략 가능, default = 23:59:59)";

    // 챌린지 목록 최신순 조회
    @ApiOperation(value = "챌린지 목록 최신순 조회")
    @GetMapping("/new")
    public ResponseEntity getNewChallenges(@ApiParam(name = "카테고리 선택", value = "미선택시 전체 카테고리에서 조회")
                                               @RequestParam @Nullable Category category) {
        List<Challenge> challenges = challengeService.findNewChallenges(category);

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    // 챌린지 목록 참여자순 조회
    @ApiOperation(value = "챌린지 목록 참여자순 조회")
    @GetMapping("/hot")
    public ResponseEntity getHotChallenges(@ApiParam(name = "카테고리 선택", value = "미선택시 전체 카테고리에서 조회")
                                               @RequestParam @Nullable Category category) {
        List<Challenge> challenges = challengeService.findHotChallenges(category);

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 회원이 생성한 챌린지 조회
    @ApiOperation(value = "회원이 생성한 챌린지 조회")
    @ApiParam(name = "회원번호 입력", value = "회원번호 입력", required = true)
    @GetMapping("/{member-id}")
    public ResponseEntity getCreateChallenges(@PathVariable("member-id") @Positive long memberId) {
        List<Challenge> challenges = challengeService.findCreateChallenges(memberId);

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 챌린지 검색(제목+내용)
    @ApiOperation(value = "챌린지 검색(제목+내용)")
    @GetMapping
    public ResponseEntity getSearchChallenges(@ApiParam(value = "100자까지 입력 가능", required = true)
                                                  @RequestParam @NotNull(message = "검색어를 입력하세요.")
                                                  @Size(max = 100, message = "검색어는 100자까지 입력 가능합니다.")
                                                  String query) {
        List<Challenge> challenges = challengeService.searchChallenges(query);

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 챌린지 삭제
    @ApiOperation(value = "챌린지 삭제")
    @ApiParam(name = "챌린지번호 입력", value = "챌린지번호 입력", required = true)
    @DeleteMapping("/{challenge-id}")
    public ResponseEntity deleteChallenge(@PathVariable("challenge-id") @Positive long challengeId) {
        challengeService.deleteChallenge(challengeId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}