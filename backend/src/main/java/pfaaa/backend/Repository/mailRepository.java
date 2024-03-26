package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pfaaa.backend.entity.Email;


public interface  mailRepository  extends JpaRepository<Email, Long> {
}
