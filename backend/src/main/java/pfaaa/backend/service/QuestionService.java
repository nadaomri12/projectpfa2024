package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.QuestionRepository;
import pfaaa.backend.entity.Question;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    private final QuestionRepository questionRepository;
    public QuestionService(QuestionRepository questionRepository){
        this.questionRepository=questionRepository;
    }
    public Question AddQuestion(Question question) {

        return questionRepository.save(question);
    }



    //methode:tout les question existant
    public List<Question> getAllquestions(){
        return questionRepository.findAll();
    }


    //methode:idCatalogue--->touslesquestion
    public List<Question> getQuestionsByIdcatalogue(Long idCatalogue ){
        List<Question> questions = questionRepository.findByCategorieIdcataloque(idCatalogue);
        return questions;}


    //methode:idUser--->touslesquestion
    public List<Question> getQuestionsByIduser(Long idUser){
        List<Question> questions = questionRepository.findByUserId(idUser);
        return questions;}


    //methode:idquestion----->son question assocè
    public Question getQuestionById(Long id){
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        return optionalQuestion.orElse(null);
        // Récupérer la question correspondant à l'ID donné, retourne un Optional<Question>
        // Si la question est présente dans l'Optional, la retourner
        // Sinon, retourner null (vous pouvez également lancer une exception ici si la question doit être obligatoirement présente)
    }

    //methode id-->remove question
    public void deletequestion(Long id) {
        boolean exist = questionRepository.existsById(id);

        if (exist) {
            questionRepository.deleteById(id);
        } else {
            throw new IllegalStateException(
                    "question with id " + id + " does not exist "
            );
        }
    }

}
