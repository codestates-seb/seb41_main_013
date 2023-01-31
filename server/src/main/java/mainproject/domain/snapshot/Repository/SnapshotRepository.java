package mainproject.domain.snapshot.Repository;

import mainproject.domain.snapshot.Entity.Snapshot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SnapshotRepository extends JpaRepository<Snapshot, String> {
    Page<Snapshot> findByChallenge_ChallengeId(long challengeId, Pageable pageable);
}
