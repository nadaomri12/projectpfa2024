package pfaaa.backend.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Panier")
public class Panier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "client_id") // Specify the foreign key column
    private Client client;






      @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
            @JoinTable(
                    name = "panier_produit",
                    joinColumns = @JoinColumn(name = "panier_id"),
                    inverseJoinColumns = @JoinColumn(name = "produit_id")
            )
            private List<Produit> produits = new ArrayList<>();

            @ElementCollection
            @CollectionTable(name = "produit_quantity", joinColumns = @JoinColumn(name = "produit_id"))
            @Column(name = "quantity")
            private List<Long> quantity = new ArrayList<>();

    public Panier() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
 public List<Produit> getProduits() {
        return produits;
    }

    public void setProduits(List<Produit> produits) {
        this.produits = produits;
    }

    public List<Long> getQuantity() {
        return quantity;
    }

    public void setQuantity(List<Long> quantity) {
        this.quantity = quantity;
    }
}