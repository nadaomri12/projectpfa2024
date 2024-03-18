import { HttpClient,} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import {CartserviceService}from'../services/cartservice.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']  
})
export class ProductComponent implements OnInit {
  products: any; 
  categories:any;
  cartproduct:any;
  constructor(private Service:SerrviceService,private cartservice:CartserviceService){
  
 }
 ngOnInit() {

  
  
  this.getcategory();
 this.getproducts();
 
  
}

addtocart(product:any){
     this.cartservice.addtoCart(product); 
     alert('Product added to cart!');
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


