import { HttpClient,} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import {CartserviceService}from'../services/cartservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']  
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  paginationId = 'productPagination'; // ID unique pour les contrôles de pagination
  pagedProducts: any[] = []; // Liste de produits affichés sur la page courante

  pages: number = 1;

  item: any;
  searchInput: any;
  filterText = '';

  categories:any;
  cartproduct:any;
  constructor(private Service:SerrviceService,private cartservice:CartserviceService,private router: Router){
  
 }
 ngOnInit() {

  this.cartservice.getcartItemList().subscribe(res => {
    this.item = res.length;
  });

  this.getcategory();
 this.getproducts();
 
  
}
  updatePagedProducts() {
    const startIndex = (this.pages === 1) ? 0 : (this.pages - 1) * 2; // Si c'est la première page, commencez à partir de l'index 0, sinon calculez l'index de départ
    this.pagedProducts = this.products.slice(startIndex, startIndex + 6); // Affichez 6 produits sur la première page, 2 produits par page pour les pages suivantes
  }

addtocart(product:any){
     this.cartservice.addtoCart(product); 
     alert('Product added to cart!');
}
pageChanged(event: any): void {
  this.pages = event;
}


searchproduct2(productName: any) {
  if (productName === null || productName === undefined) {
    
    alert('Veuillez entrer un terme de recherche.');
    return; 
  }

  this.Service.searchproduct(productName).subscribe(
    (data) => {
      console.log('Search Results:', data);
      // Naviguer vers la page searchprod avec le nom du produit en tant que paramètre
      this.router.navigate(['/searchprod/:nameprod', { nameprod: productName }]);
    }
  )
}
 getproducts(){
  this.Service.getproducts().subscribe((data) => this.products = Object.values(data));

 }
 
 getcategory(){
  this.Service.getcategory().subscribe((data) => this.categories = Object.values(data));
 }
 

  filtercategory(event:any) {
    let selectedcategory=event.target.value;
    console.log(selectedcategory);
      selectedcategory === "All" ? this.getproducts() : this.getProductsByCategorie(selectedcategory);
    }

   
  getProductsByCategorie(nomcategorie: string) {
    this.Service.getProductsByCategorie(nomcategorie)
    .subscribe((data) => this.products = Object.values(data))
    console.log(this.products)
  }

  searchproduct(nomprod:any){
    this.Service.searchproduct(nomprod).subscribe((data) => this.products = Object.values(data))
    console.log(this.products)
  }

 

  
  

}
