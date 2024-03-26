package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.LignedecommandeRepository;
import pfaaa.backend.entity.LignedeComande;

@Service
public class LignedecommandeService {

    private  final LignedecommandeRepository ligneCommanderepository;
    @Autowired
    public LignedecommandeService(LignedecommandeRepository ligneCommanderepository) {
        this.ligneCommanderepository = ligneCommanderepository;
    }



    public LignedeComande AddLigneCommande(LignedeComande ligneCommande){
        return ligneCommanderepository.save(ligneCommande);
    }
}

