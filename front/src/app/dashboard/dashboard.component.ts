import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isLoggedIn: boolean = false;
  constructor(private auth: LoginService) { }
  ngOnInit(): void {
    // Récupérer les informations de connexion du service d'authentification

    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    

      console.log("islogged?",this.isLoggedIn)
   }
   logout() {
    this.auth.signOut();
  }
}
