package mainproject.domain.challenge.dto;

import lombok.Data;
import mainproject.domain.challenge.entity.Frequency;
import mainproject.domain.member.entity.Member;
import mainproject.global.category.Category;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Data
public class ChallengePostDto {
    @NotNull
    @Positive
    private long hostMemberId;

    public Member getMember() {
        Member member = new Member();
        member.setId(hostMemberId);
        return member;
    }

    @NotNull(message = "카테고리를 선택하세요.")
    private Category category;

    @NotBlank(message = "제목을 입력하세요.")
    @Size(max = 50, message = "제목은 50자까지 입력 가능합니다.")
    private String title;

    @NotBlank(message = "설명을 입력하세요.")
    @Size(max = 500, message = "설명은 500자까지 입력 가능합니다.")
    private String content;

    // private Image challengeImage;  // TODO: 이미지파일

    @NotNull(message = "시작 날짜를 선택하세요.")
    //@Future(message = "시작 날짜는 내일 이후부터 선택 가능합니다.") // 챌린지 상태변화 테스트시 주석 처리
    private LocalDate startAt;

    @NotNull(message = "종료 날짜를 선택하세요.")
    private LocalDate endAt;

    @AssertTrue(message = "종료 날짜는 시작 날짜 이후부터 선택 가능합니다.")
    public boolean isValidChallengePeriod() {
        return endAt.isAfter(startAt);
    }

    @NotNull(message = "인증 빈도를 선택하세요.")
    private Frequency frequency = Frequency.매일; // 기본값 - 매일
    
    private LocalTime snapshotStartAt = LocalTime.parse("00:00:00", DateTimeFormatter.ofPattern("HH:mm:ss"));  // 기본값 - 00:00:00

    private LocalTime snapshotEndAt = LocalTime.parse("23:59:59", DateTimeFormatter.ofPattern("HH:mm:ss"));    // 기본값 - 23:59:59

    @AssertTrue(message = "종료 시간은 시작 시간 이후부터 선택 가능합니다.")
    public boolean isValidSnapshotTime() {
        return snapshotEndAt.isAfter(snapshotStartAt);
    }
}
