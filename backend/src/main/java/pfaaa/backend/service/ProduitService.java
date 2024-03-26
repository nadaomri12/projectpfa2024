package pfaaa.backend.service;

import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.ProduitRepository;
import pfaaa.backend.entity.Produit;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class ProduitService {

    private final ProduitRepository produitRepository;
    private final CatalogueService catalogueService;


    public ProduitService(ProduitRepository produitRepository, CatalogueService catalogueService) {
        this.produitRepository = produitRepository;
        this.catalogueService = catalogueService;
    }

    public List<Produit> getProduit() {

        return produitRepository.findAll();
    }

    public Produit addProduit(Produit produit) {

        return produitRepository.save(produit);
    }
    public Produit searchproductbynomProduit(String nomProduit){
        return produitRepository.findByNomProduit(nomProduit);
    }
    public void deleteProduit(Long id) {
        boolean exist = produitRepository.existsById(id);

        if (exist) {
            produitRepository.deleteById(id);
        } else {
            System.out.println("Produit numexiste  pas");
        }
        ;
    }

    public void updateProduit(Produit updatedProduit) {
        Optional<Produit> existingProduitOptional = produitRepository.findById(updatedProduit.getId());

        if (existingProduitOptional.isPresent()) {
            Produit existingProduit = existingProduitOptional.get();

            // Mettez à jour les propriétés du produit existant avec les nouvelles valeurs
            existingProduit.setNomProduit(updatedProduit.getNomProduit());
            existingProduit.setPrix(updatedProduit.getPrix());
            existingProduit.setDescription(updatedProduit.getDescription());
            existingProduit.setQtEnStock(updatedProduit.getQtEnStock());
            existingProduit.setDisponibilteEnStock(updatedProduit.getDisponibilteEnStock());
            existingProduit.setImage(updatedProduit.getImage());

            // Enregistrez les modifications dans la base de données
            produitRepository.save(existingProduit);
            System.out.println("Produit avec l'ID " + existingProduit.getId() + " mis à jour avec succès.");
        } else {
            System.out.println("Produit avec l'ID " + updatedProduit.getId() + " n'existe pas.");
        }
    }

    public List<Produit> findProduitsByIds(List<Long> ids)
    {
        List<Produit> result = new ArrayList<>();

        for (Long id: ids) {
            Optional<Produit> p = this.produitRepository.findById(id);
            p.ifPresent(result::add);
        }

        return result;
    }

    public List<Produit> getByCategorieNom(String categorieNom) {
        return produitRepository.findByCatalogueNomCatalogue(categorieNom);
    }


    public Produit getproductbyid(Long id){

        return produitRepository.findById(id).get();
    }


}