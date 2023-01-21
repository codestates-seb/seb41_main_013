package mainproject.domain.member.service;

public enum ExceptionMessage {
    MEMBER_NOT_FOUND("존재하지 않는 회원입니다."),
    MEMBER_EMAIL_DUPLICATES("이미 가입된 회원입니다.");

    private final String message;

    ExceptionMessage(String message) {
        this.message = message;
    }

    public String get() {
        return message;
    }

}

