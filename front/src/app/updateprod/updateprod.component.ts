import { Component } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
interface Category {
  nomCatalogue: string;
  selected: boolean;
  // ... other properties if there are any
}
@Component({
  selector: 'app-updateprod',
  templateUrl: './updateprod.component.html',
  styleUrl: './updateprod.component.css'
})
export class UpdateprodComponent {
  product: any = {
    nomProduit: '',
    description: '',
    prix:'',
    image: '',
    qtEnStock: '',
    disponibilteEnStock: '',
    nomcatalogues: [],
  };
  id:any;
  categories: any;
  selectedCategoryId: any;
constructor(private Service:SerrviceService,private route:ActivatedRoute,private router: Router){
  this.id=this.route.snapshot.paramMap.get("id");
}
 
ngOnInit() {

  this.getcategory();
  this.getproductbyid();
 
 
  
}

getproductbyid(){
  this.Service.getproduitbyid(this.id).subscribe((data) => this.product = data);
}


updateproduct() {

  this.Service.updateproduct(this.product).subscribe(
    response => {
      console.log('Product successfully updated', response);
      this.router.navigate(['/admin/productaadmin']);
      alert("Produit mis à jour avec succès")     
      
    },
    error => {
      console.error('Error updating the product', error);
    }
  );
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



}
