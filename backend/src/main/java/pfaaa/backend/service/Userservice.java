package pfaaa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.UserRepository;
import pfaaa.backend.entity.User;

import java.util.Optional;
@Service
public class Userservice {
    @Autowired
    private final UserRepository userRepository;

    public Userservice(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        // Renvoie l'utilisateur trouvé s'il existe, sinon renvoie null
        return userOptional.orElse(null);    }


}
