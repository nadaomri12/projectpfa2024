package pfaaa.backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.Question;

import java.util.List;
@Repository
public interface QuestionRepository  extends JpaRepository<Question, Long> {
    // Méthode pour récupérer toutes les questions associées à un catalogue par son ID
    List<Question> findByCategorieIdcataloque(Long idCatalogue);

    // Méthode pour récupérer toutes les questions posées par un utilisateur spécifique
    List<Question> findByUserId(Long id);

}
