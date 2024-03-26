package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.ReviewRepository;
import pfaaa.backend.entity.Review;

import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getAllReview() {
        return reviewRepository.findAll();
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

}
