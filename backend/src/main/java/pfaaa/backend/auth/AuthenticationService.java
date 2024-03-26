package pfaaa.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.AdminRepository;
import pfaaa.backend.Repository.ClientRepository;
import pfaaa.backend.Repository.UserRepository;
import pfaaa.backend.Security.JwtGenerater;
import pfaaa.backend.Token.Token;
import pfaaa.backend.Token.TokenRepository;
import pfaaa.backend.Token.TokenType;
import pfaaa.backend.entity.Admin;
import pfaaa.backend.entity.Client;
import pfaaa.backend.entity.Role;
import pfaaa.backend.entity.User;

import static pfaaa.backend.entity.Role.CLIENT;

@Service
public class AuthenticationService {
    @Autowired
    final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtGenerater jwtService;
    private final AuthenticationManager authenticationManager;
    private final AdminRepository adminrepository;
    private final ClientRepository clientRepository;

    public AuthenticationService(UserRepository userRepository, TokenRepository tokenRepository, PasswordEncoder passwordEncoder, JwtGenerater jwtService, AuthenticationManager authenticationManager, AdminRepository adminrepository, ClientRepository clientRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.adminrepository = adminrepository;
        this.clientRepository = clientRepository;
    }

    public AuthenticationResponse register(RegisterRequestDto request){


        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(CLIENT)
                .build();
          User saveduser=null;
        if (CLIENT.equals(request.getRole())) {
            Client client = new Client();
            client.setUsername(user.getUsername());
            client.setEmail(user.getEmail());
            client.setPassword(user.getPassword());
            client.setRole(user.getRole());
            client.setCompte(request.Compte);
            client.setAddress(request.address);
            client.setCIN(request.CIN);
            client.setNumTel(request.NumTel);

            saveduser =clientRepository.save(client);
        } else if (Role.ADMIN.equals(request.getRole())) {
            Admin admin = new Admin();
            admin.setUsername(user.getUsername());
            admin.setEmail(user.getEmail());
            admin.setPassword(user.getPassword());
            admin.setRole(user.getRole());

            saveduser = adminrepository.save(admin);
        }
        var jwtToken = jwtService.generateToken(saveduser);
        revokeAllUserTokens(saveduser);
        saveUserToken(saveduser,jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }





    public AuthenticationResponse authenticate( AuthenticationRequestdto request) {

        //Récupérer l'utilisateur depuis la base de données
        var userr = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));



        //Authentifier l'utilisateur à l'aide de l'authenticationManager

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()

                )
        );

        // Générer un token JWT pour l'utilisateur authentifié et la retourner
        var jwtToken = jwtService.generateToken(userr);
        revokeAllUserTokens(userr);
        saveUserToken(userr,jwtToken);



        // Extraire l'ID de l'utilisateur
        Long userId = userr.getId();

        // Vous pouvez stocker userId dans une variable ou l'utiliser comme nécessaire
        System.out.println("User ID: " + userId);

        // Ajoutez userId à votre AuthenticationResponse ou faites ce que vous voulez avec
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(userId)
                .build();
    }






    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}

