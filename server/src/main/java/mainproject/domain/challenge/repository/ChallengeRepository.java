package mainproject.domain.challenge.repository;

import mainproject.domain.challenge.entity.Challenge;
import mainproject.global.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findAllByCategory(Category category);
}
