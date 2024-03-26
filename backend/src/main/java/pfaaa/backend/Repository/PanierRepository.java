package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.Panier;

@Repository
public interface PanierRepository extends JpaRepository<Panier, Long> {

}