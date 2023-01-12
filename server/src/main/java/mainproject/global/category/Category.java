package mainproject.global.category;

import lombok.Getter;

public enum Category {
    우리동네("우리동네"),
    운동("운동"),
    생활("규칙적인 생활"),
    기타("기타");

    @Getter
    private final String names;

    Category(String names) {
        this.names = names;
    }
}
