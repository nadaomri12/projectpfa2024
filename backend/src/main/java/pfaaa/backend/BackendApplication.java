package pfaaa.backend;

import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import pfaaa.backend.Repository.AdminRepository;
import pfaaa.backend.auth.AuthenticationService;
import pfaaa.backend.auth.RegisterRequestDto;
import pfaaa.backend.entity.Admin;

import java.util.Optional;

import static pfaaa.backend.entity.Role.ADMIN;

@SpringBootApplication
public class BackendApplication   {

	public static void main(String[] args) {

		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service,
          AdminRepository adminrepo

	) {
		return args -> {
			// Vérifier si l'utilisateur Admin existe déjà

			Optional<Admin> existingAdmin = adminrepo.findByEmail("nadaomri2001@gmail.com");

			if (existingAdmin.isEmpty()) {
				// L'utilisateur Admin n'existe pas, nous pouvons le créer
				var admin = RegisterRequestDto.builder()
						.username("Admin")
						.email("nadaomri2001@gmail.com")
						.password("admin")
						.role(ADMIN)
						.build();

				System.out.println("Admin token: " + service.register(admin));
			} else {
				// L'utilisateur Admin existe déjà, pas besoin de le recréer
				System.out.println("Admin already exists.");
			}
		};
	}
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}