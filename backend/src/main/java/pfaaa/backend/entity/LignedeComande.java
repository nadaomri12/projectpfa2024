package pfaaa.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class LignedeComande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;
    private  int qtCommande;

    @ManyToOne
    @JsonBackReference(value = "commande-lignesdecommandes")

    private Commande commande;
    @ManyToOne
    @JsonBackReference(value = "produit-lignesdecommandes")

    private Produit produit;

    public LignedeComande() {
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    public int getQtCommande() {
        return qtCommande;
    }

    public void setQtCommande(int qtCommande) {
        this.qtCommande = qtCommande;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


}
