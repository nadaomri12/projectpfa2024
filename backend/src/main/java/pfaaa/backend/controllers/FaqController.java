package pfaaa.backend.controllers;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.entity.FAQ;
import pfaaa.backend.service.FaqService;
import lombok.RequiredArgsConstructor;

import java.util.List;
@RestController
@RequestMapping(path = "/api")
public class FaqController {
    private final FaqService faqService;
    public FaqController(FaqService faqService){
        this.faqService=faqService;
    }
    //1-postfaq
    @PostMapping("/catalogues")
    public ResponseEntity<FAQ> CreateFaq(@RequestBody FAQ faq) {
        return ResponseEntity.ok(faqService.createFaq(faq));
    }
    //2-getfaq
    @GetMapping("/catalogues")
    public ResponseEntity<List<FAQ>> getAllFaqs() {
        List<FAQ> AllUsers = faqService.getALLFaqs();
        return ResponseEntity.ok().body(AllUsers);
    }
    //3-RemoveFaq
    @DeleteMapping("catalogues/{id}")
    public void deleteFaqs(@PathVariable("id") long id) {
        faqService.deleteFaq(id);
    }
}
