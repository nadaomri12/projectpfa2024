package pfaaa.backend.dto;

import java.util.List;

public class updateproduitdto {
    public Long id;
    public String nomProduit;
    public float prix;
    public String description;
    public String image;
    public float qtEnStock;
    public boolean disponibilteEnStock;
    public List<String> nomcatalogues;
}
