import { Component, OnInit } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import { Router } from '@angular/router';
interface Category {
  nomCatalogue: string;
  selected: boolean;
  // ... other properties if there are any
}
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'] 
})
export class AddproductComponent implements OnInit {
  product: any = {
    nomProduit: '',
    description: '',
    prix:'',
    image: '',
    qtEnStock: '',
    disponibilteEnStock: '',
    nomcatalogues: [],
    
   
  };

  

  categories: any;

constructor(private Service:SerrviceService,private router: Router){

}
 
ngOnInit() {

  this.getcategory();
 
 
  
}




getcategory(){
  this.Service.getcategory().subscribe((data) => this.categories = Object.values(data)
  );
 }



categoryChanged() {
  if (this.categories) {
    // Filter selected categories and update nomcatalogues array
    this.product.nomcatalogues = this.categories
      .filter((category: Category) => category.selected)
      .map((category: Category) => category.nomCatalogue);
  }
}




 addprod(){
  this.Service.addproduct(this.product).subscribe(
    response => {
      alert("product successfully created")
      this.router.navigate(['/admin/productaadmin']);
      console.log('product successfully created', response);
      
    },
    error => {
      console.error('Error creating the article', error);
     
    }
  );
}

 }