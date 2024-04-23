import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

  export class SignInComponent {
    eyeIcon:string = "fa-eye-slash"
    isText: boolean = false;
    loginForm!: FormGroup;
    isLoggedIn: boolean = false;
  
    type: string = 'password';
  
    constructor(private fb: FormBuilder, private auth: LoginService, private router: Router,private toast: NgToastService
      ) {}
  
      ngOnInit(): void {
        this.loginForm = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
        });
      }
   // Cette méthode est appelée lorsqu'un utilisateur clique sur l'icône de l'œil pour afficher ou masquer le mot de passe.
  hideShowPass() {
    // Inverse la valeur de isText. Si isText est true, il devient false et vice versa.
    this.isText = !this.isText;
    
    // Met à jour l'icône de l'œil en fonction de la valeur actuelle de isText.
    // Si isText est true, l'icône de l'œil ouvert est affichée, sinon l'icône de l'œil barré est affichée.
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    
    // Met à jour le type du champ de saisie du mot de passe en fonction de la valeur actuelle de isText.
    // Si isText est true, le type est défini sur 'text', ce qui rend le texte visible.
    // Sinon, le type est défini sur 'password', ce qui masque le texte.
    this.isText ? this.type = 'text' : this.type = 'password';
  }
  
    onLogin() { // Définit la méthode onLogin() qui est déclenchée lors de la tentative de connexion
      if (this.loginForm.valid) { // Vérifie si le formulaire de connexion est valide
        const userObject = { // Crée un objet userObject avec les valeurs saisies dans le formulaire
          email: this.loginForm.value.email, // Récupère le nom d'utilisateur saisi dans le formulaire
          password: this.loginForm.value.password // Récupère le mot de passe saisi dans le formulaire
        };
    
        this.auth.login(userObject).subscribe({ // Appelle la méthode login() du service d'authentification avec userObject et s'abonne à son observable
          next: (res) => { // Si la requête est réussie, exécute cette fonction de rappel
            alert("Connexion réussie"); // Affiche un message d'alerte avec le message de succès de la réponse
            localStorage.setItem('clientId', res.userId); // Stocke l'ID du client dans le stockage local du navigateur
            console.log("clientid",res.userId)
        
            this.loginForm.reset(); // Réinitialise le formulaire de connexion
  


            if (res.userId == 1) {
              this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['']);
          }
            // Redirige l'utilisateur vers la page d'accueil après la connexion réussie
  
            this.isLoggedIn = true;
           
            localStorage.setItem('isLoggedIn', 'true');
  
  
          },
          error: (err) => { // Si la requête échoue, exécute cette fonction de rappel
    
            alert("Mot de passe incorrect"); // Affiche le message d'erreur de la réponse dans une alerte
          }
        });
      }
    }
  }

