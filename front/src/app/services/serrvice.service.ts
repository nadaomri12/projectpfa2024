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
    return this.http.delete(  `${this.url}/produit`
    +id)
  }


  updateproduct(updatedProduct: any): Observable<any> {
    return this.http.put(  `${this.url}/update/produit`
    , updatedProduct);
  }

  
  getproducts(){
   return this.http.get(    `${this.url}/produits`
   )
    
   }
   getcategory(){
    return this.http.get(   `${this.url}/catalogues`
    )

    
   }

   searchproduct(name:any){
    return this.http.get(   `${this.url}/searchproduct/`
    +name)
   }


    getproduitbyid(id:any)
    {
      return this.http.get(    `${this.url}/produit/`
      +id)
    }

    getProductsByCategorie(nomcategorie: string) {
      const params = { categorieNom: nomcategorie };
      return this.http.get(    `${this.url}/produits/categorie`
      , { params });
    }
    getProduct(){
      return this.http.get<any>("    ${this.url}/produits")
      .pipe(map((res:any)=>{
        return res;
      }))
   
    }

    addproduct(product: any): Observable<any> {
  
      return this.http.post(`${this.url}/addproduit`, product);
    }


    addcategory(category: any): Observable<any> {
  
      return this.http.post(`${this.url}/catalogue`, category);
    }
    updateCategory(categoryData: any): Observable<any> {
      
      return this.http.put(`${this.url}/catalogue`, categoryData);
    }

    deletcategory(id:any){
      return this.http.delete(`${this.url}/catalogue`+id)
    }
    getcategorybyid(id:any)
    {
      return this.http.get(`${this.url}/catalogue`+id)
    }
    postReview(Review: any) {
     
      const reviewObject = {
        message: Review.message,
        author: Review.author,
        authoremail: Review.authoremail
      };
      return this.http.post(`${this.url}/Review/post`, reviewObject);
    }
    getReview(){
      return this.http.get(`${this.url}/Review/allreview`
      )
    }

    getAllcontact():Observable<any>{
      return this.http.get<[]>(  `${this.url}/contacts`
      )
    }


    addcontact(contact: any): Observable<any> {
  
      return this.http.post(`${this.url}/contacts`, contact);
    }
    

}
