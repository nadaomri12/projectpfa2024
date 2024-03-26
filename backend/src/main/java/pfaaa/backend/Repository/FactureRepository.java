package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.Facture;

@Repository
public interface FactureRepository extends JpaRepository<Facture,Long> {
}
