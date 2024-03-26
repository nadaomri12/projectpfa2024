package pfaaa.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.entity.Contact;
import pfaaa.backend.service.ContactService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "api/")

public class ContactController {
    @Autowired

    private final ContactService contactService;
    public ContactController(ContactService contactService){
        this.contactService=contactService;
    }



    @PostMapping("/contacts")
    public ResponseEntity<Contact> CreateFaq(@RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.createContact(contact));
    }

    @GetMapping("/contacts")
    public ResponseEntity<List<Contact>> getAllContact() {
        List<Contact> AllContact = contactService.getAllContact();
        return ResponseEntity.ok().body(AllContact);
    }



}
