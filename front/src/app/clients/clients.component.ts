import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients:any
  id:any
client:any
  isLoggedIn: boolean = false;
  showPopup: boolean = false;
  openPopup(id:any): void {
    this.showPopup = true;
    this.auth.getClient(id).subscribe((client) => {
      this.client = client;
  });
    
  }

  closePopup(): void {
    this.showPopup = false;
    // Réinitialiser le message de réponse lorsque la popup est fermée
    
  }
   logout() {
    this.auth.signOut();
  }

  constructor(private auth: LoginService ,private router: Router,private location: Location){

  }

  removeClient(id: number): void {
    
    this.auth.deleteclient(id).subscribe(
      () => {
        console.log('Utilisateur supprimé avec succès');
        alert("Utilisateur supprimé avec succès")

      },

      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur :', error);
      }
    );
    this.router.navigate([' /admin/aboutclient']);

  }


  
  getAllclient(){
    this.auth.getAllClient().subscribe((data) => this.clients = Object.values(data));
  }

  ngOnInit(): void {
    this.getAllclient()
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    

    console.log("islogged?",this.isLoggedIn)
  }
}
