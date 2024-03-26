package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.ContactRepository;
import pfaaa.backend.entity.Contact;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> getAllContact() {
        return contactRepository.findAll();
    }


    public Contact createContact(Contact contact) {


        return contactRepository.save(contact);
    }
}