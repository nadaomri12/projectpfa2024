package pfaaa.backend.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity

public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nomProduit;
    private float prix;
    @Column(length = 255)
    private String description;
    @Column(length = 255)
    private String image;
    private float qtEnStock;
    private boolean disponibilteEnStock;
    @JsonManagedReference(value = "produit-catalogues")
    @JsonBackReference(value = "catalogues-produit")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "produit_categorie",
            joinColumns = @JoinColumn(name = "id_produit"),
            inverseJoinColumns = @JoinColumn(name = "id_categorie")
    )
    private Set<Catalogue> catalogues = new HashSet<>();

    @JsonBackReference(value = "produit-lignesdecommandes")
    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL)
    private List<LignedeComande> lignesdecommandes;

    public List<LignedeComande> getLignesdecommandes() {
        return lignesdecommandes;
    }

    public void setLignesdecommandes(List<LignedeComande> lignesdecommandes) {
        this.lignesdecommandes = lignesdecommandes;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    public Produit() {
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public float getPrix() {
        return prix;
    }

    public boolean getDisponibilteEnStock() {
        return disponibilteEnStock;
    }

    public void setDisponibilteEnStock(boolean disponibiliteEnStock) {
        this.disponibilteEnStock = disponibiliteEnStock;
    }

    public void setPrix(float prix) {
        this.prix = prix;
    }

    public float getQtEnStock() {
        return qtEnStock;
    }

    public void setQtEnStock(float qtEnStock) {
        this.qtEnStock = qtEnStock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Catalogue> getCatalogues() {
        return new ArrayList<>(this.catalogues);
    }

    public void setCatalogues(List<Catalogue> catalogues) {
        this.catalogues = new HashSet<>(catalogues);
    }

    public String getNomProduit() {
        return nomProduit;
    }

    public void setNomProduit(String nomProduit) {
        this.nomProduit = nomProduit;
    }

}