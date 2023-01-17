package mainproject.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    CHALLENGE_NOT_FOUND(404, "챌린지를 찾을 수 없습니다."),
    CHALLENGE_DELETE_NOT_ALLOWED(405, "챌린지를 삭제할 수 없습니다."),
    CHALLENGE_ALREADY_STARTED(405, "이미 시작 혹은 종료된 챌린지입니다."),
    CHALLENGE_NOT_IN_PROGRESS(405, "진행 중인 챌린지가 아닙니다."),
    MEMBER_ALREADY_START_CHALLENGE(403, "이미 참가 중인 챌린지입니다."),
    CHALLENGER_NOT_FOUND(404, "참가 중인 챌린지가 아닙니다."),
    SNAPSHOT_TODAY_ALREADY_EXISTS(403, "오늘 이미 인증한 챌린지입니다"),
    TIME_UNAUTHORIZED(403, "챌린지 인증 가능 시간이 아닙니다."),
    IMAGE_EMPTY(400, "이미지 파일이 존재하지 않습니다."),
    FILE_NAME_NOT_VALID(400, "파일명이 유효하지 않습니다."),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    BOARD_NOT_FOUND(404, "Board not found"),
    UNAUTHORIZED_MEMBER(403, "Unauthorized member");

    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }
}
