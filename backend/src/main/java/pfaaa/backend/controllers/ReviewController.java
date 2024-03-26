package pfaaa.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.entity.Review;
import pfaaa.backend.service.ReviewService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/Review")

public class ReviewController {
    private final ReviewService reviewService;
@Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/allreview")
    public ResponseEntity<List<Review>> getAllReview() {
        List<Review> reviews = reviewService.getAllReview();
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        Review savedReview = reviewService.addReview(review);
        return new ResponseEntity<>(savedReview, HttpStatus.OK);
    }




}
