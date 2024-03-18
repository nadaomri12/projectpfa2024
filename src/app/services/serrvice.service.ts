import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SerrviceService {

  
  constructor(private http:HttpClient) { 

  }

  deleteproduct(id:any){
    return this.http.delete("http://localhost:8080/api/produit/"+id)
  }

  updateproduct(updatedProduct: any): Observable<any> {
    return this.http.put('http://localhost:8080/api/update/produit', updatedProduct);
  }
  
  getproducts(){
   return this.http.get("http://localhost:8080/api/produits")
    
   }
   getcategory(){
    return this.http.get("http://localhost:8080/api/catalogues")
    
    
   }
   searchproduct(name:any){
    return this.http.get('http://localhost:8080/api/searchproduct/'+name)
   }

    getproduitbyid(id:any)
    {
      return this.http.get('http://localhost:8080/api/produit/'+id)
    }

    getProductsByCategorie(nomcategorie: string) {
      const params = { categorieNom: nomcategorie };
      return this.http.get('http://localhost:8080/api/produits/categorie', { params });
    }

    getProduct(){
      return this.http.get<any>("http://localhost:8080/api/produits")
      .pipe(map((res:any)=>{
        return res;
      }))
   
    }

    addproduct(product: any): Observable<any> {
  
      return this.http.post(`http://localhost:8080/api/addproduit`, product);
    }


    addcategory(category: any): Observable<any> {
  
      return this.http.post(`http://localhost:8080/api/catalogue`, category);
    }
    updateCategory(categoryData: any): Observable<any> {
      
      return this.http.put('http://localhost:8080/api/catalogue', categoryData);
    }

    deletcategory(id:any){
      return this.http.delete("http://localhost:8080/api/catalogue/"+id)
    }
    getcategorybyid(id:any)
    {
      return this.http.get('http://localhost:8080/api/catalogue/'+id)
    }
    postReview(Review: any) {
     
      const reviewObject = {
        message: Review.message,
        author: Review.author,
        authoremail: Review.authoremail
      };
      return this.http.post("http://localhost:8080/api/Review/post", reviewObject);
    }
    getReview(){
      return this.http.get("http://localhost:8080/api/Review/allreview")
    }
    getAllcontact():Observable<any>{
      return this.http.get<[]>('http://localhost:8080/api/contacts')
    }


    addcontact(contact: any): Observable<any> {
  
      return this.http.post("http://localhost:8080/api/contacts", contact);
    }
    

}
