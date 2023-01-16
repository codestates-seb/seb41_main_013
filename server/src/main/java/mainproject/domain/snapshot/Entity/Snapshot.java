package mainproject.domain.snapshot.Entity;

import lombok.Data;
import mainproject.domain.challenger.Entity.Challenger;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Snapshot implements Serializable {
    @Id
    private String snapshotId;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "MEMBER_ID", referencedColumnName = "MEMBER_ID"),
            @JoinColumn(name = "CHALLENGE_ID", referencedColumnName = "CHALLENGE_ID")
    })
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
