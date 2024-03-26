package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.LignedeComande;
@Repository
public interface LignedecommandeRepository extends JpaRepository<LignedeComande, Long> {
}
