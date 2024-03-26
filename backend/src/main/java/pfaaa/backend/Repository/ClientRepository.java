package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.Client;

import java.util.List;

@Repository

public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByEmailSubscriptionIsNotNull();

}

