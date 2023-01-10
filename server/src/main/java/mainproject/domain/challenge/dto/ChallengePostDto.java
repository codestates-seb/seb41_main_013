package mainproject.domain.challenge.dto;

import lombok.Data;
import mainproject.domain.challenge.entity.Frequency;
import mainproject.global.category.Category;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Data
public class ChallengePostDto {
    @NotNull(message = "카테고리를 선택하세요.")
    private Category category;

    @NotBlank(message = "제목을 입력하세요.")
    @Size(max = 50, message = "제목은 50자까지 입력 가능합니다.")
    private String title;

    @NotBlank(message = "설명을 입력하세요.")
    @Size(max = 500, message = "설명은 500자까지 입력 가능합니다.")
    private String content;

    //private image;  // TODO: 이미지파일 (Nullable)

    @NotNull(message = "시작 날짜를 선택하세요.")
    @Future(message = "시작 날짜는 내일 이후부터 선택 가능합니다.")
    private LocalDate startAt;

    @NotNull(message = "종료 날짜를 선택하세요.")
    // TODO: @Min(value = startAt, message = "종료 날짜는 시작 날짜 이후부터 선택 가능합니다.")
    private LocalDate endAt;

    @NotNull(message = "인증 빈도를 선택하세요.")
    private Frequency frequency;
    
    private LocalTime snapshotStartAt = LocalTime.parse("00:00", DateTimeFormatter.ofPattern("HH:mm"));  // 기본값 - 00:00

    // TODO: @Min(value = snapshotStartAt, message = "종료 시간은 시작 시간 이후부터 선택 가능합니다.")
    private LocalTime snapshotEndAt = LocalTime.parse("23:59", DateTimeFormatter.ofPattern("HH:mm"));    // 기본값 - 23:59
}
