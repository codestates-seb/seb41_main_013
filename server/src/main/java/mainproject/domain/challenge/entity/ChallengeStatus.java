package mainproject.domain.challenge.entity;

import lombok.Getter;

public enum ChallengeStatus {
    시작전("시작 전"),
    진행중("진행중"),
    종료("종료");

    @Getter
    public String status;

    ChallengeStatus(String status) {
        this.status = status;
    }
}