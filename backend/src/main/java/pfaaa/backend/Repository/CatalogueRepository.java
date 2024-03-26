package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.Catalogue;

import java.util.Optional;
@Repository
public interface CatalogueRepository extends JpaRepository<Catalogue, Long> {

    Optional<Catalogue> findBynomCatalogue(String nomCatalogue);
}

