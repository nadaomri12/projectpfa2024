
package pfaaa.backend.controllers;

import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.Repository.ProduitRepository;
import pfaaa.backend.dto.ProduitDto;
import pfaaa.backend.dto.updateproduitdto;
import pfaaa.backend.entity.Catalogue;
import pfaaa.backend.entity.Produit;
import pfaaa.backend.service.CatalogueService;
import pfaaa.backend.service.ProduitService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/api")
public class ProduitController {
    private final ProduitService productService;
    private final CatalogueService catalogueService;
    private final ProduitRepository produitRepository;

    public ProduitController(ProduitService productService, CatalogueService catalogueService, ProduitRepository produitRepository) {
        this.productService = productService;
        this.catalogueService = catalogueService;
        this.produitRepository = produitRepository;
    }

    @GetMapping("/searchproduct/{nomProduit}")
    public Produit searchproductbynomProduit(@PathVariable ("nomProduit") String nomProduit){

        return productService.searchproductbynomProduit(nomProduit);
    }

    @GetMapping("/produits")
    public List<Produit> getProduit() {

        return productService.getProduit();
    }




    @PostMapping("/addproduit")
    public ProduitDto addProduit(@RequestBody @NotNull ProduitDto produitDto) {

        Produit produit = new Produit();
        produit.setNomProduit(produitDto.nomProduit);
        produit.setDescription(produitDto.description);
        produit.setPrix(produitDto.prix);
        produit.setQtEnStock(produitDto.qtEnStock);
        produit.setImage(produitDto.image);
        produit.setDisponibilteEnStock(produitDto.disponibilteEnStock);

        List<Catalogue> catalogues = this.catalogueService.findCataloguesBybomCatalogue(produitDto.nomcatalogues);
        produit.setCatalogues(catalogues);
        productService.addProduit(produit);
        return produitDto;
    }




    @DeleteMapping("produit/{id}")
    public void deleteProduit(@PathVariable("id") long id)
    {
        productService.deleteProduit(id);
    }

    @PutMapping("/update/produit")
    public void updateProduit(@RequestBody updateproduitdto produitdto) {
        Optional<Produit> existingProduitOptional = produitRepository.findById(produitdto.id);

        if (existingProduitOptional.isPresent()) {
            Produit existingProduit = existingProduitOptional.get();
            existingProduit.setNomProduit(produitdto.nomProduit);
            existingProduit.setDescription(produitdto.description);
            existingProduit.setPrix(produitdto.prix);
            existingProduit.setQtEnStock(produitdto.qtEnStock);
            existingProduit.setImage(produitdto.image);
            existingProduit.setDisponibilteEnStock(produitdto.disponibilteEnStock);

            List<Catalogue> catalogues = this.catalogueService.findCataloguesBybomCatalogue(produitdto.nomcatalogues);
            existingProduit.setCatalogues(catalogues);

            produitRepository.save(existingProduit); // Sauvegarde des modifications apportées à l'entité Produit
        }
    }



    @GetMapping("produit/{id}")
    public Produit getProductbyid(@PathVariable("id") Long id) {

        return productService.getproductbyid(id);
    }

    @GetMapping("/produits/categorie")
    public List<Produit> getProduitsByCategorieNom(@RequestParam String categorieNom) {
        return productService.getByCategorieNom(categorieNom);
    }
}