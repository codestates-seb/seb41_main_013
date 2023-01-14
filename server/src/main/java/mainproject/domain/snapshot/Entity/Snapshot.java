package mainproject.domain.snapshot.Entity;

import lombok.Data;
import mainproject.domain.challenger.Entity.Challenger;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Snapshot {
    @Id
    private String snapshotId = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

    @ManyToOne
    @JoinColumn(name = "CHALLENGER_ID")
    private Challenger challenger;

    public void setChallenger(Challenger challenger) {
        this.challenger = challenger;
        if (!this.challenger.getSnapshots().contains(this)) {
            this.challenger.getSnapshots().add(this);
        }
    }

    // private Image snapshotImage;  // TODO: 이미지파일 (Nullable)

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
