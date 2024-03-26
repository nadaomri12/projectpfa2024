package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.PanierRepository;
import pfaaa.backend.Repository.ProduitRepository;
import pfaaa.backend.entity.Panier;
import pfaaa.backend.entity.Produit;

import java.util.Optional;

@Service
public class PanierService {

    @Autowired
    private PanierRepository panierRepository;

    @Autowired
    private ProduitRepository produitRepository;

    public Panier addarticlepanier(Panier panier) {
        return panierRepository.save(panier);
    }


    public Panier supprimerProduitDuPanier(Long panierId, Long idprod) {
        Panier panier = panierRepository.findById(panierId).orElseThrow(() -> new RuntimeException("Panier non trouvé"));
        Optional<Produit> prod = produitRepository.findById(idprod);

        prod.ifPresent(produit -> panier.getProduits().remove(produit));

        return panierRepository.save(panier);
    }

    public void viderPanier(Long panierId) {
        Panier panier = panierRepository.findById(panierId).orElseThrow(() -> new RuntimeException("Panier non trouvé"));
        panier.getProduits().clear();
        panierRepository.save(panier);
    }

    public Panier modifierProduitDansPanier(Long panierId, Long produitId, Produit newProduit) {
        Panier panier = panierRepository.findById(panierId).orElseThrow(() -> new RuntimeException("Panier non trouvé"));

        // Find and replace the existing product with the new product
        panier.getProduits().removeIf(existingProduit -> existingProduit.getId().equals(produitId));
        panier.getProduits().add(newProduit);

        return panierRepository.save(panier);
    }
}
