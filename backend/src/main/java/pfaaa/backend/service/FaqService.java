package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.FaqRepository;
import pfaaa.backend.entity.FAQ;

import java.util.List;
@Service
public class FaqService {




    private final FaqRepository faqRepository;

    @Autowired
    public FaqService(FaqRepository faqRepository) {
        this.faqRepository =faqRepository ;
    }
    //1-methode de get tous les faq
    public List<FAQ> getALLFaqs() {
        return faqRepository.findAll();
    }
    //2-methode de post un faq

    public FAQ createFaq(FAQ faq) {
        // Vérifier si l'Faq existe déjà
        if (faqRepository.existsById(faq.getId())) {
            // Si Faq existe déjà, une exception est levée
            throw new RuntimeException("faq already exists");
        }
        // Enregistrer l'faq dans la base de données
        return faqRepository.save(faq); // Retourner le faq enregistré
    }

    //3-mothode delete un faq
    public void deleteFaq(Long id){
        if(faqRepository.existsById(id)){
            faqRepository.deleteById(id);
        }
        else{
            throw new IllegalStateException(
                    " Faq with id" + id + "does not exist"
            );
        }
    }



}

