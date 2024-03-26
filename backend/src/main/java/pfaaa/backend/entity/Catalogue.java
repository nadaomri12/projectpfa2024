package pfaaa.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@JsonIgnoreProperties({"produits"})
public class Catalogue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idcataloque;
    //TODO : kaml badelhom kima 9otlok

    private String nomCatalogue;
    @JsonBackReference(value = "catalogue-produits")
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private Set<Produit> produits = new HashSet<>();


    public Long getIdcataloque() {
        return idcataloque;
    }

    public void setIdcataloque(Long idcataloque) {
        this.idcataloque = idcataloque;
    }

    public String getNomCatalogue() {
        return nomCatalogue;
    }

    public void setNomCatalogue(String nomCatalogue) {
        this.nomCatalogue = nomCatalogue;
    }

    public List<Produit> getProduits() {
        return new ArrayList<>(this.produits);
    }

    public void setProduits(List<Produit> produits) {
        this.produits = new HashSet<>(produits);
    }

}