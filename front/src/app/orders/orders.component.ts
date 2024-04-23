import { Component } from '@angular/core';
import { CartserviceService } from '../services/cartservice.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
 etat:any
 id:any
 data:any
  commandes:any={
  
  }

  showPopup: boolean = false;
  constructor(private cartservice: CartserviceService,private router: Router,private auth: LoginService){
    
  }

  closePopup(): void {
    this.showPopup = false;
   
  }
  logout() {
    this.auth.signOut();
  }
  openPopup(id: any): void {
    this.id = id; // Affectez la valeur de l'ID passé en paramètre à this.id
    this.showPopup = true;
    // Récupérez les données de la commande à partir du service en utilisant l'ID
    this.cartservice.getcommandebyid(this.id).subscribe((data) => {
      this.commandes = data; // Assurez-vous que la commande est correctement récupérée
      return(this.commandes)
    });
  }
  
  
updatecommande() {
  this.data  = {
  numcom: this.id, // ID de la commande
    etat: this.etat // État à mettre à jour
  };
 console.log(this.data)
  this.cartservice.updateCommande(this.data).subscribe(
    (response) => {
      console.log('État de la commande mis à jour avec succès', response);
      this.router.navigate(['/admin/orders']);
      alert('État de la commande a été modifié avec succès');
      this.closePopup()

    },
    (error) => {
      console.error('Erreur lors de la mise à jour de la commande', error);
    }
  );
  this.router.navigate(['/admin/orders']);

}


  getcommandes(){
    this.cartservice.getcommandes().subscribe((data) => this.commandes= Object.values(data));
   }


   ngOnInit() {
    this.getcommandes();
  }

}
