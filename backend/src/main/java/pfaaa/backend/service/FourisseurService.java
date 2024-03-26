package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfaaa.backend.Repository.FournisseurRepository;

import pfaaa.backend.entity.Client;
import pfaaa.backend.entity.Fournisseur;

import java.util.List;

@Service
public class FourisseurService {
    private final FournisseurRepository fournisseurRepository;
    @Autowired
    public FourisseurService(FournisseurRepository fournisseurRepository) {
        this.fournisseurRepository = fournisseurRepository;
    }

    public Fournisseur addfournisseur(Fournisseur fournisseur){

        fournisseurRepository.save(fournisseur);
        return (fournisseur) ;
    }
    public Fournisseur getfournisseur(Long id){

        return fournisseurRepository.findById(id).get();
    }
    public List<Fournisseur> getfournisseurs() {

        return fournisseurRepository.findAll();
    }

    public void deletefournisseur(Long id) {
        boolean exist=fournisseurRepository.existsById(id);

        if (exist){
          fournisseurRepository.deleteById(id);
        }else {
            throw new IllegalStateException(
                    "client with id "+id+" does not exist "
            );
        };
    }

    public void updatefournisseur(Long id, Fournisseur fournisseur) {

        boolean exist =fournisseurRepository.existsById(id);

        if (exist) {
            fournisseurRepository.save(fournisseur);
        } else {
            throw new IllegalStateException(
                    "client with id " + id + " does not exist "
            );
        }
    }
}
