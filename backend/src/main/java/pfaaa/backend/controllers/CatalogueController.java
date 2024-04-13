package pfaaa.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.dto.CatalogueDto;
import pfaaa.backend.dto.mappers.CatalogueMapper;
import pfaaa.backend.entity.Catalogue;
import pfaaa.backend.service.CatalogueService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api")
public class CatalogueController {
    private final CatalogueService catalogueService;
    private final CatalogueMapper catalogueMapper;
/*kkk
/*
    @PostMapping("/catalogue")
    public CatalogueDto addCatalogue(@RequestBody CatalogueDto catalogueDto) {
        Catalogue catalogue = catalogueMapper.convertToEntity(catalogueDto);
        Catalogue catalogueCreated = catalogueService.addCatalogue(catalogue);
        return catalogueMapper.convertToDto(catalogueCreated);
    }
*/

    @PostMapping ("/catalogue")
    public CatalogueDto addCatalogue(@RequestBody CatalogueDto catalogueDto) {
        System.out.println("hello from post catalogue");

        Catalogue catalogueToadd= new Catalogue(); //  creation de catalogue
        catalogueToadd.setNomCatalogue(catalogueDto.nomCatalogue); //setNomcatalogue a partir de catalogueDto
        Catalogue savedcatalogue=catalogueService.addCatalogue(catalogueToadd); // add catalogue
        catalogueDto.id=savedcatalogue.getIdcataloque(); // recuperer l'id de catalogue
        return catalogueDto;
    }
    @PutMapping("/catalogue")
    public void updatecatalogue(@RequestBody Catalogue catalogue) {
        Catalogue catalogueUpdated = catalogueService.getCatalogueById(catalogue.getIdcataloque()).get();
        catalogueService.updatecategorie(catalogueUpdated);
    }

    @GetMapping("/catalogues")
    public List<Catalogue> getcatalogue() {

        return catalogueService.getCatalogue();
    }

    @GetMapping("/catalogue/{id}")
    public Optional<Catalogue> getCatalogueById(@PathVariable("id") long id) {
        return catalogueService.getCatalogueById(id);
    }


    @DeleteMapping("catalogue/{id}")
    public void deleteProduit(@PathVariable("id") long id) {
        catalogueService.deletecatalogue(id);
    }
}
