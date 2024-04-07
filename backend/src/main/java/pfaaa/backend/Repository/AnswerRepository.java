package pfaaa.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfaaa.backend.entity.Answer;

import java.util.List;
@Repository
public interface AnswerRepository  extends JpaRepository<Answer, Long> {

    // Méthode pour récupérer toutes les reponse associées à un question par son ID
    List<Answer> findByQuestionId(Long id);
    // Méthode pour récupérer toutes les questions posées par un utilisateur spécifique
    List<Answer> findByUserId(Long id);
}