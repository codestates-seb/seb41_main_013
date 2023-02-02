package mainproject.domain.challenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import mainproject.domain.challenge.entity.Frequency;
import mainproject.domain.image.entity.Image;
import mainproject.domain.member.entity.Member;
import mainproject.global.category.Category;

import javax.validation.constraints.*;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Data
public class ChallengePostDto {
    @NotNull
    @Positive
    @ApiModelProperty(required = true, example = "1")
    private long hostMemberId;

    @ApiModelProperty(hidden = true)
    public Member getMember() {
        Member member = new Member();
        member.setId(hostMemberId);
        return member;
    }

    @NotNull(message = "카테고리를 선택하세요.")
    @ApiModelProperty(required = true, example = "우리동네")
    private Category category;

    @NotBlank(message = "제목을 입력하세요.")
    @ApiModelProperty(required = true, example = "같이 운동해요~")
    private String title;

    @NotBlank(message = "설명을 입력하세요.")
    @ApiModelProperty(required = true, example = "우리동네에서 운동 후 하루에 한 번 인증사진을 등록하시면 됩니다.")
    private String content;

    @Positive
    @ApiModelProperty(example = "1")
    private long challengeImageId = 2L; // 기본 챌린지 이미지

    @ApiModelProperty(hidden = true)
    public Image getImage() {
        Image image = new Image();
        image.setImageId(challengeImageId);
        return image;
    }

    @NotNull(message = "시작 날짜를 선택하세요.")
    //@Future(message = "시작 날짜는 내일 이후부터 선택 가능합니다.") // TODO: 테스트를 위해 주석 처리. 배포 시 주석 제거
    @ApiModelProperty(required = true, example = "2023-02-01")
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate startAt;

    @NotNull(message = "종료 날짜를 선택하세요.")
    @ApiModelProperty(required = true, example = "2023-12-31")
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate endAt;

    @AssertTrue(message = "종료 날짜는 시작 날짜 이후부터 선택 가능합니다.")
    @ApiModelProperty(hidden = true)
    public boolean isValidChallengePeriod() {
        return !endAt.isBefore(startAt);
    }

    @ApiModelProperty(hidden = true)
    private int challengeDay;

    @ApiModelProperty(hidden = true)
    public int getChallengeDay() {
        return (int) Duration.between(startAt.atStartOfDay(), endAt.atStartOfDay()).toDays() + 1;
    }

    @NotNull(message = "인증 빈도를 선택하세요.")
    @ApiModelProperty(example = "매일")
    private Frequency frequency = Frequency.매일; // 기본값 - 매일

    @ApiModelProperty(example = "00:00")
    @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
    private LocalTime snapshotStartAt = LocalTime.parse("00:00:00", DateTimeFormatter.ofPattern("HH:mm:ss"));  // 기본값 - 00:00:00

    @ApiModelProperty(example = "23:59")
    @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
    private LocalTime snapshotEndAt = LocalTime.parse("23:59:00", DateTimeFormatter.ofPattern("HH:mm:ss"));    // 기본값 - 23:59:59

    @AssertTrue(message = "종료 시간은 시작 시간 이후부터 선택 가능합니다.")
    @ApiModelProperty(hidden = true)
    public boolean isValidSnapshotTime() {
        return !snapshotEndAt.isBefore(snapshotStartAt);
    }
}
