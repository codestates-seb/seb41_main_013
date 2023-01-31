package mainproject.domain.challenge.repository;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.domain.challenge.entity.ChallengeStatus;
import mainproject.global.category.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByChallengeStatus(ChallengeStatus challengeStatus);

    List<Challenge> findByMember_Id(long memberId);

    Page<Challenge> findByCategory(Category category, Pageable pageable);
}
