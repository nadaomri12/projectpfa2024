package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pfaaa.backend.entity.Produit;

import java.util.List;


public interface ProduitRepository extends JpaRepository<Produit, Long> {

    @Query("SELECT p FROM Produit p JOIN p.catalogues c WHERE c.nomCatalogue = :nom")
    List<Produit> findByCatalogueNomCatalogue(String nom);

    Produit findByNomProduit(String nomProduit);


}