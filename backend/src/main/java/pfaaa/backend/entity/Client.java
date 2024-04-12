package pfaaa.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity(name = "Client")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DiscriminatorValue("CLIENT")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Client extends User  {

    private String address;
    private Long CIN;
    private Long NumTel;
    private String Compte;
    private String emailSubscription;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="client")
    private Set<Commande> commandes;
    @JsonBackReference
    @OneToOne(mappedBy = "client")
    private Cart cart;

    public Cart getCart() {
        return cart;
    }
    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public String getEmailSubscription() {
        return emailSubscription;
    }
    public void setEmailSubscription(String emailSubscription) {
        this.emailSubscription = emailSubscription;
    }

    public Long  getCIN() {
        return CIN;
    }
    public  void setCIN(Long CIN) {
        this.CIN = CIN;
    }

    public Long getNumTel() {
        return NumTel;
    }
    public  void setNumTel(Long numTel) {
        NumTel = numTel;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public String getCompte() {
        return Compte;
    }
    public  void setCompte(String compte) {
        Compte = compte;
    }


}

