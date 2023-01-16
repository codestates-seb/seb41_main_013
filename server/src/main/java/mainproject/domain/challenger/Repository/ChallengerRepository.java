package mainproject.domain.challenger.Repository;

import mainproject.domain.challenger.Entity.Challenger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengerRepository extends JpaRepository<Challenger, String> {
    List<Challenger> findByMember_Id(long memberId);
}
