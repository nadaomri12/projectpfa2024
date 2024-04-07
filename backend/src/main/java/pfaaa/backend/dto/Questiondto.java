package pfaaa.backend.dto;

import pfaaa.backend.entity.Question;

import java.util.Date;

public class Questiondto {
    public long id;
    public String question;

    public Long idUser;
    public Date dateQuestion;
    public Long  idCatalogue;
    // Constructeur par défaut
    public Questiondto() {
    }
    public Questiondto(Question question) {

        this.id = question.getId();
        this.question=question.getQuestion();
        this.idUser=question.getIdUser();
        this.idCatalogue=question.getIdCatalogue();
        this.dateQuestion=question.getRegistrationDate();
    }
}
