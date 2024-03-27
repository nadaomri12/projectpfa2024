import { Component } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrl: './prod.component.css'
})
export class ProdComponent {

  products: any; 
  categories:any;
  constructor(private Service:SerrviceService){
  
 }
 ngOnInit() {
  this.getproducts();
  
 
  
}
 getproducts(){
  this.Service.getproducts().subscribe((data) => this.products = Object.values(data));
 }

 
}
