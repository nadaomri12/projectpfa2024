package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.FAQ;
@Repository
public interface FaqRepository extends JpaRepository<FAQ, Long> {
    boolean existsByQuestion(String question);

}
