package mainproject.domain.challenge.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import mainproject.domain.challenge.dto.ChallengeDetailResponseDto;
import mainproject.domain.challenge.dto.ChallengePostDto;
import mainproject.domain.challenge.dto.ChallengeResponseDto;
import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.mapper.ChallengeMapper;
import mainproject.domain.challenge.service.ChallengeService;
import mainproject.domain.image.service.ImageService;
import mainproject.global.category.Category;
import mainproject.global.dto.MultiResponseDto;
import org.springframework.data.domain.Page;
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
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Validated
@Api(tags = "챌린지 생성, 조회, 삭제")
public class ChallengeController {
    private final ChallengeService challengeService;
    private final ChallengeMapper mapper;
    private final ImageService imageService;

    public ChallengeController(ChallengeService challengeService, ChallengeMapper mapper, ImageService imageService) {
        this.challengeService = challengeService;
        this.mapper = mapper;
        this.imageService = imageService;
    }

    // 챌린지 생성
    @ApiOperation(value = "챌린지 생성")
    @PostMapping
    public ResponseEntity postChallenge(@ApiParam(name = "챌린지 상세정보 입력", value = postChallengeDescription, required = true)
                                            @RequestBody ChallengePostDto request) {
        Challenge challenge = challengeService.createChallenge(mapper.challengePostDtoToChallenge(request));

        ChallengeResponseDto response = mapper.challengeToChallengeResponseDto(challenge);

        response.setHostProfileImageUrl(imageService.createPresignedUrl(challenge.getMember().getImage().getImageId()));
        response.setChallengeImageUrl(imageService.createPresignedUrl(challenge.getImage().getImageId()));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    final String postChallengeDescription = "hostMemberId: 회원번호 (로그인 후 챌린지 생성 가능)" + "\r\n" +
            "category: 카테고리 ([우리동네, 운동, 생활, 기타] 중 입력)" + "\r\n" +
            "title: 챌린지 제목" + "\r\n" +
            "content: 챌린지 설명" + "\r\n" +
            "challengeImageId: 챌린지 이미지번호 (이미지 업로드 후 사용 가능, 생략 가능)" + "\r\n" +
            "startAt: 챌린지 시작 날짜 예) 2023-02-01 (내일 이후부터 선택 가능)" + "\r\n" +
            "endAt: 챌린지 종료 날짜 예) 2023-03-31 (시작 날짜 이후로 설정 가능)" + "\r\n" +
            "frequency: 인증 빈도 (생략 가능, default = 매일)" + "\r\n" +
            "snapshotStartAt: 인증 시작 시간 예) 00:00 (생략 가능, default = 00:00:00)" + "\r\n" +
            "snapshotEndAt: 인증 종료 시간 예) 22:00 (시작 시간 이후로 설정 가능, 생략 가능, default = 23:59:00)" + "\r\n\r\n" +
            "Responses" + "\r\n" +
            "challengeStatus: 챌린지 상태 [시작전, 진행중, 종료]" + "\r\n" +
            "challengerCount: 챌린지 참가자 수";

    // 챌린지 상세조회
    @ApiOperation(value = "챌린지 상세조회")
    @GetMapping("/details/{challenge-id}")
    public ResponseEntity getChallenge(@ApiParam(value = "챌린지번호 입력", required = true)
                                           @PathVariable("challenge-id") @Positive long challengeId,
                                       @ApiParam(value = "회원의 챌린지 참가여부 조회 - 회원번호 입력")
                                       @RequestParam @Positive @Nullable Long memberId) {
        Challenge challenge = challengeService.findChallenge(challengeId);

        ChallengeDetailResponseDto response = mapper.challengeToChallengeDetailResponseDto(challenge);

        response.setHostProfileImageUrl(imageService.createPresignedUrl(challenge.getMember().getImage().getImageId()));
        response.setChallengeImageUrl(imageService.createPresignedUrl(challenge.getImage().getImageId()));

        String checkChallenging = "로그인이 필요합니다.";

        if (memberId != null) {
            checkChallenging = challengeService.checkChallenging(challengeId, memberId);
        }

        response.setCheckChallenging(checkChallenging);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
    // 챌린지 목록 최신순 조회
    @ApiOperation(value = "챌린지 목록 최신순 조회")
    @GetMapping("/new")
    public ResponseEntity getNewChallenges(@ApiParam(value = "카테고리 선택 - 미선택시 전체 카테고리에서 조회")
                                               @RequestParam @Nullable Category category,
                                           @ApiParam(value = "페이지 - 미입력시 첫 페이지 출력")
                                           @RequestParam(defaultValue = "1") @Nullable @Positive int page) {
        Page<Challenge> pageChallenges = challengeService.findNewChallenges(category, page - 1);

        List<Challenge> challenges = pageChallenges.getContent();

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        for (int i = 0; i < response.size(); i++) {
            response.get(i).setHostProfileImageUrl(imageService.createPresignedUrl(challenges.get(i).getMember().getImage().getImageId()));
            response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challenges.get(i).getImage().getImageId()));
        }

        return new ResponseEntity<>(new MultiResponseDto<>(response, pageChallenges), HttpStatus.OK);
    }

    // 챌린지 목록 참여자순 조회
    @ApiOperation(value = "챌린지 목록 참여자순 조회")
    @GetMapping("/hot")
    public ResponseEntity getHotChallenges(@ApiParam(value = "카테고리 선택 - 미선택시 전체 카테고리에서 조회")
                                               @RequestParam @Nullable Category category,
                                           @ApiParam(value = "페이지 - 미입력시 첫 페이지 출력")
                                           @RequestParam(defaultValue = "1") @Nullable @Positive int page) {
        Page<Challenge> pageChallenges = challengeService.findHotChallenges(category, page - 1);

        List<Challenge> challenges = pageChallenges.getContent();

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        for (int i = 0; i < response.size(); i++) {
            response.get(i).setHostProfileImageUrl(imageService.createPresignedUrl(challenges.get(i).getMember().getImage().getImageId()));
            response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challenges.get(i).getImage().getImageId()));
        }

        return new ResponseEntity<>(new MultiResponseDto<>(response, pageChallenges), HttpStatus.OK);
    }
     */
    // 챌린지 목록 최신순 조회(전체 카테고리 조회 시 무한스크롤 적용X)
    @ApiOperation(value = "챌린지 목록 최신순 조회")
    @GetMapping("/new")
    public ResponseEntity getNewChallenges(@ApiParam(value = "카테고리 선택 - 미선택시 전체 카테고리에서 조회")
                                               @RequestParam @Nullable Category category,
                                           @ApiParam(value = "페이지 - 미입력시 첫 페이지 출력")
                                           @RequestParam(defaultValue = "1") @Nullable @Positive int page) {
        if (category == null) {
            List<Challenge> challenges = challengeService.findNewChallengesTemp();

            List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

            for (int i = 0; i < response.size(); i++) {
                response.get(i).setHostProfileImageUrl(imageService.createPresignedUrl(challenges.get(i).getMember().getImage().getImageId()));
                response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challenges.get(i).getImage().getImageId()));
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        else {
            Page<Challenge> pageChallenges = challengeService.findNewChallenges(category, page - 1);

            List<Challenge> challenges = pageChallenges.getContent();

            List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

            for (int i = 0; i < response.size(); i++) {
                response.get(i).setHostProfileImageUrl(imageService.createPresignedUrl(challenges.get(i).getMember().getImage().getImageId()));
                response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challenges.get(i).getImage().getImageId()));
            }

            return new ResponseEntity<>(new MultiResponseDto<>(response, pageChallenges), HttpStatus.OK);
        }
    }

    // 챌린지 목록 참여자순 조회(전체 카테고리 조회 시 무한스크롤 적용X)
    @ApiOperation(value = "챌린지 목록 참여자순 조회")
    @GetMapping("/hot")
    public ResponseEntity getHotChallenges(@ApiParam(value = "카테고리 선택 - 미선택시 전체 카테고리에서 조회")
                                               @RequestParam @Nullable Category category,
                                           @ApiParam(value = "페이지 - 미입력시 첫 페이지 출력")
                                           @RequestParam(defaultValue = "1") @Nullable @Positive int page) {
        if (category == null) {
            List<Challenge> challenges = challengeService.findHotChallengesTemp();

            List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

            for (int i = 0; i < response.size(); i++) {
                response.get(i).setHostProfileImageUrl(imageService.createPresignedUrl(challenges.get(i).getMember().getImage().getImageId()));
                response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challenges.get(i).getImage().getImageId()));
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        else {
            Page<Challenge> pageChallenges = challengeService.findHotChallenges(category, page - 1);

            List<Challenge> challenges = pageChallenges.getContent();

            List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

            for (int i = 0; i < response.size(); i++) {
                response.get(i).setHostProfileImageUrl(imageService.createPresignedUrl(challenges.get(i).getMember().getImage().getImageId()));
                response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challenges.get(i).getImage().getImageId()));
            }

            return new ResponseEntity<>(new MultiResponseDto<>(response, pageChallenges), HttpStatus.OK);
        }
    }

    // 회원이 생성한 챌린지 조회
    @ApiOperation(value = "회원이 생성한 챌린지 조회")
    @GetMapping("/host/{member-id}")
    public ResponseEntity getCreateChallenges(@ApiParam(value = "회원번호 입력", required = true)
                                                  @PathVariable("member-id") @Positive long memberId,
                                              @ApiParam(value = "페이지 - 미입력시 첫 페이지 출력")
                                              @RequestParam(defaultValue = "1") @Nullable @Positive int page) {
        Page<Challenge> pageChallenges = challengeService.findCreateChallenges(memberId, page - 1);

        List<Challenge> challenges = pageChallenges.getContent();

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        for (int i = 0; i < response.size(); i++) {
            response.get(i).setHostProfileImageUrl(imageService.createPresignedUrl(challenges.get(i).getMember().getImage().getImageId()));
            response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challenges.get(i).getImage().getImageId()));
        }

        return new ResponseEntity<>(new MultiResponseDto<>(response, pageChallenges), HttpStatus.OK);
    }

    // 챌린지 검색(제목+내용)
    @ApiOperation(value = "챌린지 검색(제목+내용)")
    @GetMapping
    public ResponseEntity getSearchChallenges(@ApiParam(value = "100자까지 입력 가능", required = true)
                                                  @RequestParam @NotNull(message = "검색어를 입력하세요.")
                                                  @Size(max = 100, message = "검색어는 100자까지 입력 가능합니다.")
                                                  String query,
                                              @ApiParam(value = "페이지 - 미입력시 첫 페이지 출력")
                                              @RequestParam(defaultValue = "1") @Nullable @Positive int page) {
        Page<Challenge> pageChallenges = challengeService.searchChallenges(query, page - 1);

        List<Challenge> challenges = pageChallenges.getContent();

        List<ChallengeResponseDto> response = mapper.challengesToChallengeResponseDtos(challenges);

        for (int i = 0; i < response.size(); i++) {
            response.get(i).setHostProfileImageUrl(imageService.createPresignedUrl(challenges.get(i).getMember().getImage().getImageId()));
            response.get(i).setChallengeImageUrl(imageService.createPresignedUrl(challenges.get(i).getImage().getImageId()));
        }

        return new ResponseEntity<>(new MultiResponseDto<>(response, pageChallenges), HttpStatus.OK);
    }

    // 챌린지 삭제
    @ApiOperation(value = "챌린지 삭제")
    @DeleteMapping("/{challenge-id}")
    public ResponseEntity deleteChallenge(@ApiParam(value = "챌린지번호 입력", required = true)
                                              @PathVariable("challenge-id") @Positive long challengeId) {
        challengeService.deleteChallenge(challengeId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}