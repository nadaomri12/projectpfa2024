package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.ProduitRepository;
import pfaaa.backend.entity.Produit;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ArticlePanierService {
@Autowired
    private final ProduitRepository produitRepository;

    public ArticlePanierService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public List<Produit> findProduitsByIds(List<Long> ids)
    {
        List<Produit> result = new ArrayList<>();

        for (Long id: ids) {
            Optional<Produit> c = this.produitRepository.findById(id);
            c.ifPresent(result::add);
        }

        return result;
    }

}
