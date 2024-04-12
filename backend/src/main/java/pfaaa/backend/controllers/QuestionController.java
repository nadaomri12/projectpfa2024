package pfaaa.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.Repository.QuestionRepository;
import pfaaa.backend.Repository.UserRepository;
import pfaaa.backend.dto.Questiondto;
import pfaaa.backend.entity.Catalogue;
import pfaaa.backend.entity.Question;
import pfaaa.backend.entity.User;
import pfaaa.backend.service.CatalogueService;
import pfaaa.backend.service.ClientService;
import pfaaa.backend.service.QuestionService;
import pfaaa.backend.service.Userservice;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "api/")
public class QuestionController {
    @Autowired

    private final QuestionService questionService;

    private final CatalogueService catalogueService;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final Userservice service;

    public QuestionController(QuestionService questionService, CatalogueService catalogueService, QuestionRepository questionRepository, UserRepository userRepository,  Userservice service) {
        this.questionService = questionService;
        this.catalogueService = catalogueService;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.service = service;
    }

    //1-postquestion
    @PostMapping("/questions")
    public Questiondto AddQuestion(@RequestBody Questiondto questionDto) {
        Question ques = new Question();
        User user = this.service.getUser(questionDto.idUser);
        Catalogue categorie = catalogueService.getCatalogueById(questionDto.idCatalogue)
                .orElseThrow(() -> new IllegalArgumentException("Catégorie non trouvée"));
        ques.setCategorie(categorie);
        ques.setUser(user);
        System.out.println("voila categorie" + categorie);
        ques.setQuestion(questionDto.question);
        questionService.AddQuestion(ques);
        return questionDto;

    }

    //1-getAllquestions
    @GetMapping("/questions")
    public List<Questiondto> getAllQuestions() {
        List<Question> questions = questionService.getAllquestions();
        // Mapper les articles en DTOs
        List<Questiondto> questionDtos = questions.stream()
                .map(Questiondto::new)
                .collect(Collectors.toList());
        // Ce code prend une liste d'objets Produit.
        //Il transforme chaque objet Produit en un objet ProduitDto.
        //  Pour réaliser cette transformation, il utilise une méthode appelée référence de constructeur (ProduitDto::new).
        //  Ensuite, il collecte ces objets transformés dans une liste.
        //  Enfin, il renvoie la liste des objets ProduitDto.
        return questionDtos;
    }

    //2-getmethode:idquestion---->son question
    @GetMapping("/questions/{id}")
    public ResponseEntity<Questiondto> getQuestionById(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id);

        // Vérifier si la question existe
        if (question == null) {
            return ResponseEntity.notFound().build(); // Retourner une réponse 404 si la question n'est pas trouvée
        }

        // Mapper l'objet Question à un objet QuestionDto
        Questiondto questionDto = new Questiondto(question);

        return ResponseEntity.ok(questionDto); // Retourner la questionDto si elle existe
    }

    // 3-getQuestionsByIdcatalogue
    @GetMapping("/questions/catalogue")
    public List<Questiondto> getQuestionByIdCatalogue(@RequestParam Long idcatalogue) {
        List<Question> questions = questionService.getQuestionsByIdcatalogue(idcatalogue);
        List<Questiondto> questionDtos = questions.stream()
                .map(Questiondto::new)
                .collect(Collectors.toList());
        return questionDtos;

    }

    // 4-getQuestionsByIdUser
    @GetMapping("/questions/user")
    public List<Questiondto> getQuestionByIdUser(@RequestParam Long id) {
        List<Question> questions = questionService.getQuestionsByIduser(id);
        List<Questiondto> questionDtos = questions.stream()
                .map(Questiondto::new)
                .collect(Collectors.toList());
        return questionDtos;

    }


//deletequestionbyid

    @DeleteMapping("questions/{id}")
    public void deleteProduit(@PathVariable("id") long id) {
        questionService.deletequestion(id);
    }



}