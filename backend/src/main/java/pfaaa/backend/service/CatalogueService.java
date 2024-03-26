package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.CatalogueRepository;
import pfaaa.backend.entity.Catalogue;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class CatalogueService {

    private final CatalogueRepository catalogueRepository;

    @Autowired
    public CatalogueService(CatalogueRepository catalogueRepository) {
        this.catalogueRepository = catalogueRepository;
    }

    public Catalogue addCatalogue(Catalogue catalogue) {

        return catalogueRepository.save(catalogue);
    }

    public List<Catalogue> findCataloguesByIds(List<Long> ids) {
        List<Catalogue> result = new ArrayList<>();

        for (Long id : ids) {
            Optional<Catalogue> c = this.catalogueRepository.findById(id);
            c.ifPresent(result::add);
        }

        return result;
    }


    public List<Catalogue> findCataloguesBybomCatalogue(List<String> nomcatalouges) {
        List<Catalogue> result = new ArrayList<>();

        for (String nomcatalogue : nomcatalouges) {
            Optional<Catalogue> c = this.catalogueRepository.findBynomCatalogue(nomcatalogue);
            c.ifPresent(result::add);
        }

        return result;
    }


    public void updatecategorie( Catalogue updatecategorie) {
        boolean exists = catalogueRepository.existsById(updatecategorie.getIdcataloque());

        if (exists) {
            updatecategorie.setNomCatalogue(updatecategorie.getNomCatalogue());
            //updatecategorie.setProduits(updatecategorie.getProduits());

            catalogueRepository.save(updatecategorie);
        } else {
            throw new IllegalStateException("Client with id " +updatecategorie.getIdcataloque() + " does not exist");
        }
    }



    public List<Catalogue> getCatalogue() {

        return catalogueRepository.findAll();
    }

    public Optional<Catalogue> getCatalogueById(Long id) {
        return catalogueRepository.findById(id);
    }


    public void deletecatalogue(Long id) {
        boolean exist = catalogueRepository.existsById(id);

        if (exist) {
            catalogueRepository.deleteById(id);
        } else {
            throw new IllegalStateException(
                    "catalogue with id " + id + " does not exist "
            );
        }
    }
}