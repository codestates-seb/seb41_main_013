package mainproject.domain.snapshot.Repository;

import mainproject.domain.snapshot.Entity.Snapshot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SnapshotRepository extends JpaRepository<Snapshot, String> {
    List<Snapshot> findByChallenge_ChallengeId(long challengeId);
}
