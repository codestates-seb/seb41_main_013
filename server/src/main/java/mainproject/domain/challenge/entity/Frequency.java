package mainproject.domain.challenge.entity;

import lombok.Getter;

public enum Frequency {
    주1회("주 1회"),
    주2회("주 2회"),
    주3회("주 3회"),
    주4회("주 4회"),
    주5회("주 5회"),
    주6회("주 6회"),
    매일("매일");

    @Getter
    private final String times;

    Frequency(String times) {
        this.times = times;
    }
}
