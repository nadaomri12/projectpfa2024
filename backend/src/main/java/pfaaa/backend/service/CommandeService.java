package pfaaa.backend.service;
import jakarta.persistence.EntityNotFoundException;
import pfaaa.backend.entity.Commande;
import pfaaa.backend.Repository.CommandeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommandeService {

    private final CommandeRepository commandeRepository;

    @Autowired
    public CommandeService(CommandeRepository commandeRepository) {
        this.commandeRepository = commandeRepository;
    }

    public Commande addCommande(Commande commande) {
        commandeRepository.save(commande);
        return commande;
    }

    public Commande getCommande(Long id) {
        return commandeRepository.findById(id).get();
    }

    public List<Commande> getCommandes() {
        return commandeRepository.findAll();
    }

    public List<Commande> getCommandesByClientId(Long clientId) {
        return commandeRepository.findByClientId(clientId);
    }
    public void updateCommande(Long id, Commande commande) {
        boolean exists = commandeRepository.existsById(id);

        if (exists) {
            commandeRepository.save(commande);
        } else {
            throw new IllegalStateException("Commande with id " + id + " does not exist");
        }
    }
    public void deletecommande(Long id) {
        if (commandeRepository.existsById(id)) {
            commandeRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Commande with id " + id + " not found");
        }
    }

}