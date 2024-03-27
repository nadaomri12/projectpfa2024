import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../services/cartservice.service';
import { SerrviceService } from '../services/serrvice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  item: number=0;
  searchInput: any;
 idclient:any
 cart:any
  constructor(private cartService: CartserviceService, private productService: SerrviceService, private router: Router) {
    this.idclient = localStorage.getItem('clientId');
  }

  
  searchproduct(productName: any) {
    if (productName === null || productName === undefined) {
      
      alert('Veuillez entrer un terme de recherche.');
      return; 
    }

    this.productService.searchproduct(productName).subscribe(
      (data) => {
        console.log('Search Results:', data);
        // Naviguer vers la page searchprod avec le nom du produit en tant que paramètre
        this.router.navigate(['/searchprod/:nameprod', { nameprod: productName }]);
      }
    )
  }
  getcartbyid() {
    this.cartService.getCartbyid(this.idclient).subscribe((cart: any) => {
      // Vérifiez si cartitems est un objet, convertissez-le en tableau si nécessaire
      if (!Array.isArray(cart.cartitems)) {
        cart.cartitems = [cart.cartitems];
        
      }
      this.item=cart.cartitems.length;
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    this.getcartbyid()
  }
}