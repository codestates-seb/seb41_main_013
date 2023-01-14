package mainproject.domain.snapshot.Dto;

import lombok.Data;
import mainproject.domain.challenger.Entity.Challenger;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class SnapshotPostDto {
    @NotNull
    @Positive
    private long challengerId;

    public Challenger getChallenger() {
        Challenger challenger = new Challenger();
        challenger.setChallengerId(challengerId);
        return challenger;
    }

    // private Image snapshotImage;  // TODO: 이미지파일 (Nullable)
}
