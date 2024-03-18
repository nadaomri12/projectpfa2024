import { Component } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import { EmailService } from '../services/email.service';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-contactadmin',
  templateUrl: './contactadmin.component.html',
  styleUrl: './contactadmin.component.css'
})
export class ContactadminComponent {
  contacts: any = [
   
    
  ];
 
  isLoggedIn: boolean = false;

 
  logout() {
   this.auth.signOut();
 }
 

  showPopup: boolean = false;
  showPopup2: boolean = false;
  replyMessage: string = '';
  currentContact: any; // Ajoutez un point d'exclamation pour indiquer que la variable sera initialisée ultérieurement
 
  constructor(private service:SerrviceService, private SendEmail: EmailService,private auth: LoginService){
  
  }
  getAllContact(): void {
    this.service.getAllcontact()
      .subscribe(contacts => {
        this.contacts = contacts;
      });
  }

  openPopup(contact: any): void {
    this.showPopup = true;
    this.currentContact = contact; // Stocker le contact actuel
  }

  closePopup(): void {
    this.showPopup = false;
    // Réinitialiser le message de réponse lorsque la popup est fermée
    this.replyMessage = '';
  }

  replyToContact(): void {
    if (!this.replyMessage) {
      alert('Please enter a message before sending.'); // Affiche un message d'erreur si le champ du message est vide
      return; // Arrête l'exécution de la fonction
    }

    if (this.currentContact) {
      const formData = new FormData();
      formData.append('to', this.currentContact.email);
      formData.append('subject', 'Re: Your message');
      formData.append('body', 'Reply: ' + this.replyMessage);
    console.log(formData)
      this.SendEmail.sendNewsletter(formData)
        .subscribe({
          next: (response) => {
            alert ('Response sent successfully!')
            this.replyMessage = ''; // Réinitialiser le message de réponse après l'envoi
            this.closePopup(); // Fermer la popup après l'envoi
          },
          error: (error) => {
            console.error('Erreur lors de l\'envoi de la réponse : ', error);
          }
        });
    } else {
      console.error('Aucun contact sélectionné pour répondre.');
    }
  }







  ngOnInit(): void {
    this.getAllContact();
  
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
    
      console.log("islogged?",this.isLoggedIn)
    }
  }

