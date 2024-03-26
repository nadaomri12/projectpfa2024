package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pfaaa.backend.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}