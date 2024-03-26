package pfaaa.backend.controllers;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.Repository.CommandeRepository;
import pfaaa.backend.dto.CommandeDto;
import pfaaa.backend.dto.ProduitDto;
import pfaaa.backend.dto.updatecommadedto;
import pfaaa.backend.entity.*;
import pfaaa.backend.service.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api")
public class CommandeController {
    @Autowired
    private final CommandeService commandeService;

    @Autowired
    private final FactureService factureService;
    private final ProduitService produitService;
    private final ClientService clientService;
    private final  LignedecommandeService lignedecommandeservice;
    private final CommandeRepository commandeRepository;
    public CommandeController(CommandeService CommandeService, LignedecommandeService lignedecommandeService, ClientService clientService, ProduitService produitService, FactureService factureService, CommandeRepository commandeRepository) {
        this.commandeService = CommandeService;
        this.factureService= factureService;
        this.clientService=clientService;
        this.produitService=produitService;
        this.lignedecommandeservice=lignedecommandeService;
        this.commandeRepository = commandeRepository;
    }

    @PostMapping("/addcommande")

    public Commande addCommande( @RequestBody @NotNull CommandeDto commandeDto) {
        Client c = clientService.getClient(commandeDto.idclient);
        // creation d'une commande
        Commande commande = new Commande();
        commande.setDate(commandeDto.date);
        commande.setDescription(commandeDto.description);
        commande.setEtat(commandeDto.etat);
        commande.setNumcom(commandeDto.numcom);
       // commande.setTotalMontant(commandeDto.totalMontant);
        commande.setClient(c);
        commandeService.addCommande(commande);
        //creation de facture (automatiquement apres la commande)
        Facture Facture = new Facture();
        Facture.setDate(commandeDto.date);


        // Récupérer la liste de produits et des quantités de commande depuis ProduitDto(Data)
        List<ProduitDto> produits = commandeDto.produits;
        List<Integer> qtCommande = commandeDto.qtCommande;

        // Création de lignes de commande pour chaque produit
        List<LignedeComande> listLigneCommande = new ArrayList<>();  // Initialisez la liste en dehors de la boucle
        double totalMontantFacture = 0.0;  // Variable pour suivre le montant total à payer dans la facture

        for (int i = 0; i < produits.size(); i++) {
            ProduitDto prod = produits.get(i);

            // Récupérer le produit par ID
            Produit produit = produitService.getproductbyid(prod.id);

            // Récupérer la liste de lignes de commande du produit
            List<LignedeComande> listLigneCommandeProduit = produit.getLignesdecommandes();

            // Créer une nouvelle ligne de commande
            LignedeComande ligneCommande = new LignedeComande();
            ligneCommande.setCommande(commande);
            ligneCommande.setQtCommande(qtCommande.get(i));
            ligneCommande.setProduit(produit);
            // Calculer le montant de la ligne de commande
            double montantLigneCommande = produit.getPrix() * qtCommande.get(i);

            // Ajouter le montant de la ligne de commande au total de la facture
            totalMontantFacture += montantLigneCommande;



            // Ajouter la nouvelle ligne de commande à la liste de lignes de commande du produit
            listLigneCommandeProduit.add(ligneCommande);

            // Mettre à jour la liste de lignes de commande du produit
            produit.setLignesdecommandes(listLigneCommandeProduit);

            // Ajouter la nouvelle ligne de commande à la liste générale de lignes de commande
            listLigneCommande.add(ligneCommande);

            // Ajouter la ligne de commande à la base de données
            lignedecommandeservice.AddLigneCommande(ligneCommande);
        }

// Mettre à jour la commande avec la liste complète de lignes de commande
        commande.setLignesdecommandes(listLigneCommande);

        // Mettre à jour le montant à payer dans l'objet Facture
        Facture.setMontantpayer(totalMontantFacture);


        factureService.addfacture(Facture);
         commande.setFacture(Facture);
        // Mettre à jour la commande avec la facture

        commandeService.addCommande(commande);

    // Retourner la commande mise à jour
        return commande;

    }


    @GetMapping("/commande/client/{clientId}")
    public List<Commande> getCommandesByClientId(@PathVariable Long clientId) {
        return commandeService.getCommandesByClientId(clientId);
    }
    @PutMapping("update")

    public void updateProduit(@RequestBody updatecommadedto commandedto) {
        Optional<Commande> existingCommandeOptional = commandeRepository.findById(commandedto.numcom);

        if (existingCommandeOptional.isPresent()) {
            Commande existingCommande = existingCommandeOptional.get();
           // existingCommande.setDate(commandedto.date);
            //existingCommande.setDescription(commandedto.description);
            existingCommande.setEtat(commandedto.etat);
            existingCommande.setNumcom(commandedto.numcom);
            //existingCommande.setClient(commandedto.client);
           // existingCommande.setLignesdecommandes(commandedto.lignesdecommandes);
            commandeRepository.save(existingCommande);
        }

    }

    @GetMapping(path = "commande/{id}")
    public Commande getCommande(@PathVariable Long id) {
        return commandeService.getCommande(id);
    }
    @DeleteMapping("deletecommande/{id}")
    public void deletecommande(@PathVariable("id") Long id){
        commandeService.deletecommande(id);
    }

    @GetMapping("/commandes")
    public List<Commande> getCommandes() {
        return commandeService.getCommandes();
    }
}