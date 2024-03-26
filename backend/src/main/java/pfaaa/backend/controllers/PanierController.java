package pfaaa.backend.controllers;

import io.micrometer.common.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.Repository.ProduitRepository;
import pfaaa.backend.dto.PanierDto;
import pfaaa.backend.entity.Panier;
import pfaaa.backend.entity.Produit;
import pfaaa.backend.service.ArticlePanierService;
import pfaaa.backend.service.ClientService;
import pfaaa.backend.service.PanierService;
import pfaaa.backend.service.ProduitService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/api")
public class PanierController {

    private final PanierService panierService;
    private final ProduitService produitService;
    private final ClientService clientService;
    private  final ArticlePanierService articlepanierService;
    private final ProduitRepository prodrRespository;

    public PanierController(PanierService panierService, ProduitService produitService, ClientService clientService, ArticlePanierService articlepanierService, ProduitRepository prodrRespository) {
        this.panierService = panierService;
        this.produitService = produitService;
        this.clientService = clientService;
        this.articlepanierService = articlepanierService;
        this.prodrRespository = prodrRespository;
    }

    @PostMapping("/addarticle")
    public void ajouterArticleAuPanier(@RequestBody @NonNull PanierDto panierDto) {
        // Validation
        if (panierDto.ProductsIds == null || panierDto.ProductsIds.isEmpty()) {
            throw new IllegalArgumentException("La liste ProductsIds ne peut pas être null ou vide.");
        }

        // Create a new Panier instance
        Panier panier = new Panier();

        // Set quantity and client
        panier.setQuantity(panierDto.quantity);
        panier.setClient(clientService.getClient(panierDto.idclient));

        // Fetch the list of Produits by their IDs
        List<Produit> produits = produitService.findProduitsByIds(panierDto.ProductsIds);

        // Set the list of Produits in the Panier
        panier.setProduits(new ArrayList<>(produits));

        // Call the service method to add the article to the Panier
        panierService.addarticlepanier(panier);
    }




    @DeleteMapping("/deletearticle/{id}")
    public void deletearticle(@PathVariable("id") Long id) {
       Produit produit = prodrRespository.findById(id).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        panierService.supprimerProduitDuPanier(produit.getId(),id);
    }

    @PostMapping("/vider/{id}")
    public void viderPanier(@PathVariable Long id) {
        panierService.viderPanier(id);
    }

   /* @PutMapping("updatearticle/{id}")
    public void updatearticle(@PathVariable("id")  Long id, @RequestBody Articledepanier article ){
       panierService.modifierProduitDansPanier(id,  article);
    }*/

}
