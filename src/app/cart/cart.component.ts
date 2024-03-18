import { Component, OnInit } from '@angular/core';
import {CartserviceService}from'../services/cartservice.service';
import { json } from 'express';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit {
  cartItemList:any;
  quantity:any;
  totalPrice: number = 0;
  product:any;
  item:any


   
  constructor(private cartservice:CartserviceService){
  
  }

  


  incrementquantity(id:any){
    this.cartservice.incrementquantity(id);
   
  }
  decrementquantity(id:any){
    this.cartservice.decrementquantity(id);
   
  }
  getTotalPrice(){
    this.cartservice.getTotalPrice();
    
  }

  removeAllCart(){
    this.cartservice. removeAllCart()
  }
  deletefromcart(cartitem:any){
    this.cartservice.deleteitem(cartitem);
    
  }

  


 
  
  ngOnInit() {
    this.cartservice.getcartItemList().subscribe((cartItems) => {
      this.cartItemList = cartItems;
      this.totalPrice = this.cartservice.getTotalPrice();
      console.log(this.totalPrice)
    });
}
}
