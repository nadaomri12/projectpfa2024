package pfaaa.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "commande")
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numcom;//TODO : badelhom
    private Date date;
    private  String description ;

    private String etat;
   @ManyToOne( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Client client;
    @OneToOne( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Facture facture;

    public Facture getFacture() {
        return facture;
    }

    public void setFacture(Facture facture) {
        this.facture = facture;
    }
//Gérer les dépendances en cascade avec JPA :
//

// Si vous souhaitez que la suppression d'une commande entraîne également la suppression des lignes de commande associées, //
// vous pouvez utiliser l'annotation CascadeType appropriée.
    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL)
  private List<LignedeComande> lignesdecommandes;

    public List<LignedeComande> getLignesdecommandes() {
        return lignesdecommandes;
    }

    public void setLignesdecommandes(List<LignedeComande> lignesdecommandes) {
        this.lignesdecommandes = lignesdecommandes;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }


    public Commande(){}

    public Long getNumcom() {
        return numcom;
    }

    public void setNumcom(Long numcom) {
        this.numcom = numcom;
    }



    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }





    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
