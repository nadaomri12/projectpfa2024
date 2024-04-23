import { Component } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent {
  categories: any;
  id:any;
  isLoggedIn: boolean = false;

  
   logout() {
    this.auth.signOut();
  }

  constructor(private service:SerrviceService,private route:ActivatedRoute,private auth: LoginService){
    this.id=this.route.snapshot.paramMap.get("id");
  }
   
  

  
  ngOnInit() {

    this.getcategory();
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    

    console.log("islogged?",this.isLoggedIn)
 }
     
   
    
   deletecategory(categoryId: number) {
    // Appelez votre service pour supprimer le produit avec l'ID spécifié
    this.service.deletcategory(categoryId).subscribe(
      response => {
        console.log('category successfully deleted', response);
        alert("Catégorie supprimée avec succès")
        this.refreshProductList();
        
      },
      error => {
        console.error('Error deleting category', error);
      }
    );
  }
 


  refreshProductList() {
    // Rafraîchissez la liste des produits ici après la suppression si nécessaire
    
    this.getcategory();
  }




getcategory(){
  this.service.getcategory().subscribe((data) => this.categories = Object.values(data)
  );
 }

}