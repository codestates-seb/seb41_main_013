package mainproject.domain.challenge.repository;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.entity.ChallengeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByChallengeStatus(ChallengeStatus challengeStatus);

    List<Challenge> findByMember_Id(long memberId);
}
