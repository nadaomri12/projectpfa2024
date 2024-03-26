package pfaaa.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "factures")
public class Facture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numFac;
    private Date date;// 3leh date sring
    private double  montantpayer;// todo  yelzm blech aacent



       public Long getNumFac() {
        return numFac;
    }

    public void setNumFac(Long numFac) {
        this.numFac = numFac;
    }


    public double getMontantpayer() {
        return montantpayer;
    }

    public void setMontantpayer(double montantpayer) {
        this.montantpayer = montantpayer;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }




}
