import { Component  , ElementRef, ViewChild } from '@angular/core';
import { EmailService } from '../services/email.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {


  @ViewChild('subjectContent') subjectContent!: ElementRef; // Initialisation avec ! pour indiquer que la propriété sera définie

  Users:any[] = [];
  emailList: string[] = [];
  subject: string = '';
  body: string='';


  constructor( private auth: LoginService,private SendEmail:EmailService) { } 
  // Injecter le FormBuilder pour créer le formulaire
  ngOnInit(): void {

    this.subject = 'New information !!!!!'; // Définissez la valeur par défaut dans ngOnInit()

    this.getSubscribedUsers(); 
  }
    
  getSubscribedUsers(): void {
    this.auth.getSubscribedUsers()
      .subscribe(users => {
        this.Users = users;
            //Cette fonction prend en argument les données émises par l'Observable
            //, ici représentées par la variable users.
            // Ensuite, elle met à jour la propriété Users du composant NewsletterComponent avec ces données.

        this.emailList = this.Users.map(user => user.emailSubscription);
        console.log("emaillist",this.emailList);
      });
  } 




sendNewsletter(){
  const formData = new FormData();
  this.emailList.forEach(e => {
    formData.append('to', e);
  })
  formData.append('subject', this.subject);
  formData.append('body', this.body);
  this.SendEmail.sendNewsletter(formData)
    .subscribe({
      next: (response) => {
        console.log('Message envoyé avec succès !', response);
        alert("Message envoyé avec succès !")
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi du message : ', error);
      }
    })
  }
  logout() {
    this.auth.signOut();
  }

  deleteEmailSubscription(id: number): void {
    this.auth.deleteEmailSubscription(id).subscribe(
      () => {
        alert('Email subscription deleted successfully');
        // Réactualisez vos données si nécessaire après la suppression
      },
      error => {
        console.error('Error deleting email subscription:', error);
        alert('Failed to delete email subscription');
      }
    );
  }



}