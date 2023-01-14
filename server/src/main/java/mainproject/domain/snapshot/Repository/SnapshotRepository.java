package mainproject.domain.snapshot.Repository;

import mainproject.domain.snapshot.Entity.Snapshot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SnapshotRepository extends JpaRepository<Snapshot, String> {
}
