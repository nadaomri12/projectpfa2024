import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerrviceService } from '../services/serrvice.service';
import { EmailService } from '../services/email.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  emailForm!: FormGroup; //pour stocker les donnees du formulaire 

  products: any; 
  
  constructor(private Service:SerrviceService,private router: Router, private fb: FormBuilder,private location: Location,private  auth:EmailService){
  
 }
 ngOnInit() {
  this.emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  this.getproducts();
  
 
  
}
 getproducts(){
  this.Service.getproducts().subscribe((data) => this.products = Object.values(data));
 }



 
 onSubmit() {
  console.log("hello")
  console.log( this.emailForm.value); // Afficher l'e-mail dans la console (à remplacer par l'envoi au serveur)
   // Récupérer la valeur de l'e-mail à partir du formulaire

  if (this.emailForm.valid) { // Vérifier si le formulaire est valide avant de le soumettre
    const email = this.emailForm.value.email; // Récupérer la valeur de l'e-mail à partir du formulaire
    console.log('Email submitted:', email); // Afficher l'e-mail dans la console (à remplacer par l'envoi au serveur)
    const userId = localStorage.getItem('clientId'); // Récupérer l'ID de l'utilisateur depuis le stockage local
    console.log(userId)
    
    if (!userId) { // Vérifie si l'ID de l'utilisateur n'est pas présent dans le stockage local
      console.error('User ID not found in local storage'); // Affiche une erreur dans la console
      return; // Sort de la fonction sans exécuter la requête
    }

    // Si l'ID de l'utilisateur est présent dans le stockage local, procéder à l'envoi de la demande
    this.auth.subscribeEmail(+userId, email).subscribe( // Appelle la méthode subscribeEmail du service auth avec l'ID converti en nombre et l'adresse e-mail

    (response) => { // Fonction de rappel en cas de succès de la requête

      alert("Abonnement à la newsletter réussi"); // Affiche un message d'alerte avec le message de succès de la réponse
      this.router.navigate(['']);

        // Traitez la réponse de l'API si nécessaire
      },
      (error) => { // Fonction de rappel en cas d'erreur de la requête
        alert("Échec de l'abonnement à la newsletter"); // Affiche un message d'alerte avec le message de succès de la réponse

        // Traitez l'erreur de l'API si nécessaire
      }
    );
    this.router.navigate(['']);
  }}

 


}