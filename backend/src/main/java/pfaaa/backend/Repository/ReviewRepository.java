package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.Review;
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
