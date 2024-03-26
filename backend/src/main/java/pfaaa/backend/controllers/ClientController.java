package pfaaa.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.dto.ClientDto;
import pfaaa.backend.dto.EmaildeSubscription;
import pfaaa.backend.entity.Client;
import pfaaa.backend.service.ClientService;
import pfaaa.backend.service.EmailService;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/api")
public class ClientController {

    @Autowired
    private final ClientService clientService;
    private EmailService emailService;

    public ClientController(ClientService ClientService, EmailService emailService) {
        this.clientService = ClientService;
        this.emailService=emailService;
    }


    @GetMapping(path = "/client/{id}")
    public Client getClient(@PathVariable Long id) {
        return clientService.getClient(id);
    }
    // @PreAuthorize("hasRole('ADMIN')")

    @GetMapping("/clients")
    public List<Client> getClients() {

        return clientService.getClients();
    }


    @PatchMapping("/users/email/{id}")
    public ClientDto updateUser(@PathVariable Long id, @RequestBody EmaildeSubscription request) {
        Client updatedUser = clientService.UpdateEmailSubscriptionUser(id, request.emailSubscription);
        ClientDto user=new ClientDto(updatedUser);

        // Vérifier si une question est fournie dans la demande

        return user;
    }

    @DeleteMapping("email/{id}")
    public void deleteEmailSubscription(@PathVariable("id") long id) {
        clientService.deleteEmailSubscription(id);
    }

    @GetMapping("/subscribed")
    public List<ClientDto> getSubscribedEmployees() {
        List<Client> subscribedEmployees = clientService.getSubscribedUsers();
        List<ClientDto> userDtos = subscribedEmployees.stream()
                .map(ClientDto::new) // Utilise le constructeur UserDto(User user)
                .collect(Collectors.toList());

        return userDtos;
    }


    @DeleteMapping("/deleteclient/{id}")
    public void   deleteclient(@PathVariable("id") Long id){
        clientService.deleteclient(id);
    }

    @PutMapping("client")
    public void updateclient( @RequestBody Client client ){
        clientService.updateClient(client);
    }
}
