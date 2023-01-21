package mainproject.domain.image.entity;

import lombok.Data;
import mainproject.domain.challenge.entity.Challenge;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @Column(nullable = false)
    private String originalFileName;

    @Column(nullable = false)
    private String storedFileName;

    @Column(nullable = false)
    private long fileSize;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "image")
    private Challenge challenge;

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
        if (challenge.getImage() != this) {
            challenge.setImage(this);
        }
    }
}
