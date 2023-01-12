package mainproject.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    CHALLENGE_NOT_FOUND(404, "챌린지를 찾을 수 없습니다."),
    CHALLENGE_DELETE_NOT_ALLOWED(405, "챌린지를 삭제할 수 없습니다."),
    IMAGE_EMPTY(400, "이미지 파일이 존재하지 않습니다."),
    FILE_NAME_NOT_VALID(400, "파일명이 유효하지 않습니다."),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    BOARD_NOT_FOUND(404, "Board not found"),
    UNAUTHORIZED_MEMBER(403, "Unauthorized member");

    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }
}
