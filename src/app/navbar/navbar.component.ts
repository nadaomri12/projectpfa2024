import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { SerrviceService } from '../services/serrvice.service';
import { CartserviceService } from '../services/cartservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  products: any; 
  item: number=0;
  searchInput: any;
  AfficheCard = false;
  idclient:any
  client: any; // Correction de l'attribut clients
  categories: any;
  cart:any
  constructor(private auth: LoginService, private service: SerrviceService,private cartService: CartserviceService, private router: Router) {
    this.idclient = localStorage.getItem('clientId');
   }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.getUserProfileFromDatabase();
    this.getcategory();
    this.getproducts();
    console.log("islogged?", this.isLoggedIn);
    this.getcartbyid()
  }

  getUserProfileFromDatabase() {
    const userId = localStorage.getItem('clientId');
    console.log(userId);
    if (userId !== null && userId !== undefined && userId !== 'undefined') {
      console.log(userId !== null && userId !== undefined);
      this.auth.getClient(userId).subscribe((client) => { // Correction de l'utilisation de userId
        this.client = client;
      });
    }
    console.log (this.client.username)
  }

  logout() {
    this.auth.signOut();
  }

  close() {
    this.AfficheCard = false;
  }

  show() {
    this.AfficheCard = true;
  }

  getproducts() {
    this.service.getproducts().subscribe((data) => this.products = Object.values(data));
  }
   
  getcategory() {
    this.service.getcategory().subscribe((data) => this.categories = Object.values(data));
  }

  filtercategory(event: any) {
    let selectedcategory = event.target.value;
    console.log(selectedcategory);
    selectedcategory === "All" ? this.getproducts() : this.getProductsByCategorie(selectedcategory);
  }

  getProductsByCategorie(nomcategorie: string) {
    this.service.getProductsByCategorie(nomcategorie)
      .subscribe((data) => this.products = Object.values(data));
    console.log(this.products);
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

}