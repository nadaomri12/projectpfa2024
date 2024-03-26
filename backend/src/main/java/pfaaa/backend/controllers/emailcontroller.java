package pfaaa.backend.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pfaaa.backend.service.EmailService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/mail")
public class emailcontroller {
    private EmailService emailService;

    public emailcontroller(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public String sendMail(@RequestParam(value = "file", required = false) MultipartFile[] file, String[] to, String subject, String body) {
        return emailService.sendMail(file, to, subject, body);
    }
}