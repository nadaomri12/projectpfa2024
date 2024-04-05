import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class SerrviceService {

  url=environment.apiURL
  constructor(private http:HttpClient) { 
  }

  deleteproduct(id:any){
    return this.http.delete(  `api/produit/`
    +id)
  }


  updateproduct(updatedProduct: any): Observable<any> {
    return this.http.put(  `api/update/produit`
    , updatedProduct);
  }

  
  getproducts(){
   return this.http.get(    `api/produits`
   )
    
   }
   getcategory(){
    return this.http.get(   `api/catalogues`
    )

    
   }

   searchproduct(name:any){
    return this.http.get(   `api/searchproduct/`
    +name)
   }


    getproduitbyid(id:any)
    {
      return this.http.get(    `api/produit/`
      +id)
    }

    getProductsByCategorie(nomcategorie: string) {
      const params = { categorieNom: nomcategorie };
      return this.http.get(    `api/produits/categorie`
      , { params });
    }
    getProduct(){
      return this.http.get<any>("    api/produits")
      .pipe(map((res:any)=>{
        return res;
      }))
   
    }

    addproduct(product: any): Observable<any> {
  
      return this.http.post(`api/addproduit`, product);
    }


    addcategory(category: any): Observable<any> {
  
      return this.http.post(`api/catalogue`, category);
    }
    updateCategory(categoryData: any): Observable<any> {
      
      return this.http.put(`api/catalogue`, categoryData);
    }

    deletcategory(id:any){
      return this.http.delete(`api/catalogue/`+id)
    }
    getcategorybyid(id:any)
    {
      return this.http.get(`api/catalogue/`+id)
    }
    postReview(Review: any) {
     
      const reviewObject = {
        message: Review.message,
        author: Review.author,
        authoremail: Review.authoremail
      };
      return this.http.post(`api/Review/post`, reviewObject);
    }
    getReview(){
      return this.http.get(`api/Review/allreview`
      )
    }

    getAllcontact():Observable<any>{
      return this.http.get<[]>(  `api/contacts`
      )
    }


    addcontact(contact: any): Observable<any> {
  
      return this.http.post(`api/contacts`, contact);
    }
    

}
