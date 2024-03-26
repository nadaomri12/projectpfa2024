package pfaaa.backend.dto;

import java.util.Date;
import java.util.List;

public class CommandeDto {
    public Long numcom;
    public Date date;
    public  String description ;
    //public Double totalMontant;
    public String etat;
    public Long idclient;
    public List<ProduitDto> produits;
    public List<Integer>qtCommande;

}