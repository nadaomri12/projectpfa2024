import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import { ActivatedRoute } from '@angular/router';
import {CartserviceService}from'../services/cartservice.service';


@Component({
  selector: 'app-produitdetail',
  templateUrl: './produitdetail.component.html',
  styleUrl: './produitdetail.component.css'
})
export class ProduitdetailComponent implements OnInit  {
  id:any;
 product:any;
idclient:any
 Review: any={
  message:'',
  author:'',
  authoremail:''

 }
 

 quantity:number=1;
  constructor(private route:ActivatedRoute,private Service:SerrviceService,private cartservice:CartserviceService){
   this.id=this.route.snapshot.paramMap.get("id");
   this.idclient = localStorage.getItem('clientId');
 }
 getproductbyid(){
  this.Service.getproduitbyid(this.id).subscribe((data) => this.product = data);
}

getReview() {
  
  this.Service.getReview().subscribe(
    (data) => {
      
      this.Review = data;
    },
    (error) => {
      
      console.error('Error getting review data', error);
    }
  );
}
addReview() {
  console.log('Review to be sent:', this.Review);

  this.Service.postReview(this.Review).subscribe(
    response => {
      console.log('Review successfully added:', response);
      alert("Your review successfully added");
      
    },
    error => {
      console.error('Error adding review:', error);
    }
  );
}



incrementQuantity() {
  this.quantity += 1;
  
}

decrementQuantity() {
  if (this.quantity > 1) {
    this.quantity -= 1;
   
  }
}

 addtocart(){

  const item = {
    idclient: this.idclient,
    quantity: this.quantity,
    productid: this.id 
  };
  console.log(item)
  this.cartservice.AddtooCart(item).subscribe(
    response => {
      alert("item added to cart successfully ")
      
      console.log('item added to cart', response);
      
    },
    error => {
      console.error('Error adding item to cart', error);
     
    }
  );
}


ngOnInit() {
  this.getproductbyid();
  this.getReview()
}

}
