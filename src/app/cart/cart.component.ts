import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../services/cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any = {
    idcart: '',
    cartitems: [],
    client: ''
  };
  quantity: any;

 idclient:any
 commandeDto: any;
 



  constructor(private cartservice: CartserviceService) {
    this.idclient = localStorage.getItem('clientId');
    this.commandeDto = {
      
      date: new Date().toISOString().split('T')[0], 
      description: 'Your order description here', 
     
      etat: 'En attente', 
      idclient: this.idclient, 
      produits: [], // initialisation de produits
      qtCommande: [] // initialisation de qtCommande
    };
   
  }

  getcartbyid() {
    this.cartservice.getCartbyid(this.idclient).subscribe((cart: any) => {
      // Vérifiez si cartitems est un objet, convertissez-le en tableau si nécessaire
      if (!Array.isArray(cart.cartitems)) {
        cart.cartitems = [cart.cartitems];
      }
      this.cart = cart;
      this.updateCommandeDto();
    });
  }


  updateCommandeDto() {
    // Mise à jour de la commandeDto avec les produits et quantités du panier
    this.commandeDto.produits = this.cart.cartitems.map((item: any) => ({
      id:item.product.id,
      name: item.product.nomProduit,
      price: item.product.prix,
      description:item.product.description,
      qtEnStock:item.product.qtEnStock,
      disponibilteEnStock:item.product.disponibilteEnStock,
      cataloguesIds: item.product.cataloguesIds

    }));
    this.commandeDto.qtCommande = this.cart.cartitems.map((item: any) => item.quantity);
  }


  deleteitemfromcart(idclient:any ,idproduct:any) {

    console.log(this.idclient,idproduct)
    // Appelez votre service pour supprimer le produit avec l'ID spécifié
    this.cartservice.removeitemfromcart(this.idclient,idproduct).subscribe(
      response => {
        console.log('le produit a ete supprimèè avec succès', response);
        alert("Article supprimé avec succès");
        this.getcartbyid(); 
        
      },
      error => {
        console.error('Error deleting the item', error);
      }
    );
  }

  removeAllItem() {

    
    // Appelez votre service pour supprimer le produit avec l'ID spécifié
    this.cartservice.removeAllItem(this.idclient).subscribe(
      response => {
        console.log('tous les articles sont supprimées avec succès', response);
        alert("tous les articles sont supprimées avec succès")
       
        
      },
      error => {
        console.error('Error deleting the  all item', error);
      }
    );
  }
  Addcommande() {
    console.log(this.commandeDto);
    this.cartservice.addcommande(this.commandeDto).subscribe(

      
      response => {
        console.log('Commande ajoutée avec succès', response);
        alert("Commande ajoutée avec succès");
      },
      error => {
        console.error('Erreur lors de l\'ajout de la commande', error);
        alert("Erreur lors de l'ajout de la commande. Veuillez réessayer plus tard.");
      }
    );
  }



  
  ngOnInit() {
    this.getcartbyid();
  }
}
