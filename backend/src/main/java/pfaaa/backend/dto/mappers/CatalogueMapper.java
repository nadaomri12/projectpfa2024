package pfaaa.backend.dto.mappers;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pfaaa.backend.dto.CatalogueDto;
import pfaaa.backend.entity.Catalogue;
import pfaaa.backend.service.CatalogueService;

@RequiredArgsConstructor
@Component
public class CatalogueMapper {

    private final ModelMapper modelMapper;
    private final CatalogueService catalogueService;

    public Catalogue convertToEntity(CatalogueDto catalogueDto) {
        Catalogue catalogue = modelMapper.map(catalogueDto, Catalogue.class);

        if (catalogueDto.getId() != null) {
            Catalogue oldCatalogue = catalogueService.getCatalogueById(catalogueDto.getId()).get();
            catalogue.setIdcataloque(oldCatalogue.getIdcataloque());
            catalogue.setNomCatalogue(oldCatalogue.getNomCatalogue());
        }
        return catalogue;
    }

    public CatalogueDto convertToDto(Catalogue catalogue) {
        CatalogueDto catalogueDto = modelMapper.map(catalogue, CatalogueDto.class);
        return catalogueDto;
    }
}
