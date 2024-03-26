package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.Cartitem;

import java.util.Set;

@Repository
public interface CartItemRepository extends JpaRepository<Cartitem, Long> {
    @Query("SELECT ci FROM Cartitem ci WHERE ci.cart.id = :id")
    Set<Cartitem> findAllByCartId(Long id);
}