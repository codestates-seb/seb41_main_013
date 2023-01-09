package mainproject.domain.challenge.controller;

import mainproject.domain.challenge.dto.ChallengePostDto;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/challenges")
@Validated
public class ChallengeController {


    // 챌린지 생성
    public ResponseEntity postChallenge(@Valid @RequestBody ChallengePostDto challengePostDto) {

    }

    // 챌린지 목록 최신순 조회


    // 챌린지 목록 참여자순 조회


    // 회원이 생성한 챌린지 조회 TODO: 매핑 필요

    // 챌린지 시작, 종료 TODO: 사용자가 입력한 시간에 따라 자동 업데이트 구현 필요


    // 챌린지 삭제
}
