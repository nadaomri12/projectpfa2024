package pfaaa.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.ClientRepository;
import pfaaa.backend.entity.Client;
import java.util.List;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }



    public Client getClient(Long id){

        return clientRepository.findById(id).get();
    }
    public List<Client> getClients() {

        return clientRepository.findAll();
    }
    public List<Client> getSubscribedUsers()
    {
        return clientRepository.findByEmailSubscriptionIsNotNull();
    }
    public void deleteclient(Long id) {
        boolean exist=clientRepository.existsById(id);

        if (exist){
            clientRepository.deleteById(id);
        }else {
            throw new IllegalStateException(
                    "client with id "+id+" does not exist "
            );
        };
    }
    public Client UpdateEmailSubscriptionUser(Long userId, String emailSubscription) {
        Client user = clientRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setEmailSubscription(emailSubscription);
            return clientRepository.save(user);
        } else {
            return null;
        }
    }
    public void updateClient( Client updatedClient) {
        boolean exists = clientRepository.existsById(updatedClient.getId());

        if (exists) {
            updatedClient.setEmail(updatedClient.getEmail());
            updatedClient.setAddress(updatedClient.getAddress());
            updatedClient.setNumTel(updatedClient.getNumTel());
            updatedClient.setCIN(updatedClient.getCIN());
            updatedClient.setCompte(updatedClient.getCompte());

            clientRepository.save(updatedClient);
        } else {
            throw new IllegalStateException("Client with id " + updatedClient.getId() + " does not exist");
        }
    }

    public void deleteEmailSubscription(Long id) {
        // Recherchez le client par ID dans la base de données
        Client client = clientRepository.findById(id).orElse(null);

        // Vérifiez si le client existe
        if (client != null) {
            // Supprimez la souscription par e-mail
            client.setEmailSubscription(null);

            // Enregistrez les modifications dans la base de données
            clientRepository.save(client);
        } else {
            // Si le client n'existe pas, lancez une exception appropriée ou effectuez une autre action nécessaire
            throw new IllegalStateException("Client with ID " + id + " does not exist");
        }
    }

}