package pfaaa.backend.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.entity.Facture;
import pfaaa.backend.service.FactureService;
import java.util.List;

@RequestMapping(path = "/api")
@RestController
public class FactureController {
    private FactureService factureService;
    @Autowired
    public FactureController(FactureService factureService){
        this.factureService=factureService;
    }

    @GetMapping("/factures")
    public List<Facture> getfactures() {
        return factureService.getfactures();
    }
    @GetMapping(path = "facture/{id}")
    public Facture getfacture(@PathVariable Long id) {
        return factureService.getfacture(id);
    }
    @PostMapping("/addfacture")
    public Facture addfacture(@RequestBody Facture facture) {
        factureService.addfacture(facture);
        return facture;
    }

    @DeleteMapping("delete/{id}")
    public void deletefacture(@PathVariable("id") Long id){
        factureService.deletefacture(id);
    }


}
