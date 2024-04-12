import { Component } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {
  categories: any;
 category: any = {
  nomCatalogue: '',
 }

  constructor(private Service:SerrviceService,private router: Router){
  
  }

  
    
  refreshProductList() {
    // Rafraîchissez la liste des produits ici après la suppression si nécessaire
    
    this.getcategory();
  }

  getcategory(){
    this.Service.getcategory().subscribe((data) => this.categories = Object.values(data)
    );
   }
  addCategory(){
    this.Service.addcategory(this.category).subscribe(
      response => {
        alert("category successfully created")
        console.log('category successfully created', response);
        this.router.navigate(['/admin/categorie']);
      },
      error => {
        console.error('Error creating category', error);
       
      }
    );
  }
  ngOnInit() {

    this.getcategory();
    
     
   }
}
