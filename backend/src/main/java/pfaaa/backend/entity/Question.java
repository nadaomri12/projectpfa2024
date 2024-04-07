package pfaaa.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;
import java.util.List;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date registrationDate = new Date(); // Date d'enregistrement par défaut

    private String question;
    @JdbcTypeCode(SqlTypes.JSON)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id", nullable = false)


    private User user;
    @ManyToOne
    @JoinColumn(name = "categorie_id", nullable = false)

    private Catalogue categorie;


    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers;


    public Catalogue getCategorie() {
        return categorie;
    }

    public void setCategorie(Catalogue categorie) {
        this.categorie = categorie;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    //methode :donne c'es Catalogue -->resultat son id
    public Long getIdCatalogue() {
        return  (categorie.getIdcataloque());

    }
    //methode :donne c'est User -->resultat son id
    public Long getIdUser() {
        return  (user.getId());

    }

}
