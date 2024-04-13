import { Component } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.css'
})
export class ProductsAdminComponent {
  products: any;
  product:any
  categories:any
  constructor(private Service:SerrviceService,  private auth: LoginService
  ){
  
  }
  getcategory(){
    this.Service.getcategory().subscribe((data) => this.categories = Object.values(data));
   }
  deleteproduct(productId: number) {
    // Appelez votre service pour supprimer le produit avec l'ID spécifié
    this.Service.deleteproduct(productId).subscribe(
      response => {
        console.log('Product successfully deleted', response);
        alert("Product successfully deleted")
        this.refreshProductList();
        
      },
      error => {
        console.error('Error deleting the product', error);
      }
    );
  }
  logout() {
    this.auth.signOut();
  }

  refreshProductList() {
    // Rafraîchissez la liste des produits ici après la suppression si nécessaire
    
    this.getproducts();
  }


  getproducts(){
    this.Service.getproducts().subscribe((data) => this.products = Object.values(data));
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



  ngOnInit() {

  this.getproducts();
  this.getcategory();
   
 }
 



}
