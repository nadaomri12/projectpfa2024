package pfaaa.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.FactureRepository;
import pfaaa.backend.entity.Facture;

import java.util.List;
@Service
public class FactureService {
    final private FactureRepository factureRepository;

    @Autowired
    public FactureService(FactureRepository factureRepository) {
        this.factureRepository = factureRepository;
    }

    public Facture getfacture(Long id) {
        return factureRepository.findById(id).get();
    }

    public List<Facture> getfactures() {
        return factureRepository.findAll();
    }

    public Facture addfacture(Facture facture) {

        factureRepository.save(facture);
        return (facture);
    }

    public void deletefacture(Long id) {
        boolean exist = factureRepository.existsById(id);

        if (exist) {
            factureRepository.deleteById(id);
        } else {
            throw new IllegalStateException(
                    "facture with id " + id + " does not exist "
            );
        }

    }
}
