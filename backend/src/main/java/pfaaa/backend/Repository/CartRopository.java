package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pfaaa.backend.entity.Cart;

public interface CartRopository extends JpaRepository<Cart,Long> {

}
