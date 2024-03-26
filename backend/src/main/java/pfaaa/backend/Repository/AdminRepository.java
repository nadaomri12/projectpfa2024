package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.Admin;
import pfaaa.backend.entity.User;

import java.util.Optional;
@Repository
public interface  AdminRepository  extends JpaRepository<User,Long> {

    Optional<Admin> findByEmail(String email);


}
