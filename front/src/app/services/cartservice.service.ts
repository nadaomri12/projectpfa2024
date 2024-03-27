import { Injectable, model } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
  //BehaviorSubject  object qui stocke la liste des articles dans le panier.
  private cartItemList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItemList$: Observable<any[]> = this.cartItemList.asObservable();
   quantity:any;
 
  constructor(private http:HttpClient) {
    // Récupérer les données du panier depuis le stockage local au démarrage de l'application
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItemList.next(storedCartItems);
  }

  addtoCart(product: any) {
    const currentCartItems = this.cartItemList.value;
    currentCartItems.push({...product, quantity: 1});
    this.cartItemList.next([...currentCartItems]);

    // Sauvegarder les données du panier dans le stockage local après chaque modification
    localStorage.setItem('cartItems', JSON.stringify(currentCartItems));

    console.log('item added to cart:', product);
  }
  
  
  deleteitem(product: any) {
    // Obtenir la valeur actuelle du BehaviorSubject (qui semble s'appeler cartItemList)
    const currentCartItems = this.cartItemList.value;
  
    // Trouver l'index de l'élément dans le panier en fonction de son ID
    const index = currentCartItems.findIndex((item: any) => item.id === product.id);
  
    // Si l'élément est trouvé (index différent de -1), le supprimer
    if (index !== -1) {
      currentCartItems.splice(index, 1);
  
      // Mettre à jour le BehaviorSubject apres les modofications 
      this.cartItemList.next([...currentCartItems]);
  
      // Sauvegarder les données du panier dans le stockage local après chaque modification
      localStorage.setItem('cartItems', JSON.stringify(currentCartItems));
    }
  }
  


  incrementquantity(id: any) {
    // Incrémenter la quantité pour l'élément du panier avec l'ID correspondant
    let currentCartItems = this.cartItemList.value;
    const cartItem = currentCartItems.find((item) => item.id === id);

    if (cartItem) {
      cartItem.quantity++;
    }

    // Mettre à jour le BehaviorSubject après les modifications
    this.cartItemList.next([...currentCartItems]);

    // Sauvegarder les données du panier dans le stockage local après chaque modification
    localStorage.setItem('cartItems', JSON.stringify(currentCartItems));
  }

  decrementquantity(id: any) {
    // Incrémenter la quantité pour l'élément du panier avec l'ID correspondant
    let currentCartItems = this.cartItemList.value;
    const cartItem = currentCartItems.find((item) => item.id === id);

    if  (cartItem && cartItem.quantity > 1){
      cartItem.quantity--;
    }
    this.cartItemList.next([...currentCartItems]);

   localStorage.setItem('cartItems', JSON.stringify(currentCartItems));
  }

  getTotalPrice(): number {
    return this.cartItemList.value.reduce((grandTotal, item) => {
      return grandTotal + (item.price*item.quantity);
    }, 0);
  }

  removeAllCart() {
    // Mettre à jour le BehaviorSubject avec un tableau vide
    this.cartItemList.next([]);
  
    // Sauvegarder les données du panier dans le stockage local après chaque modification
    localStorage.setItem('cartItems', JSON.stringify([]));
  }
  getcartItemList(): Observable<any[]> {
    return this.cartItemList$;
  }
 ///minhna yabda code s7i7 bl api backend
 
  AddtooCart(item:any): Observable<any> { 
    return this.http.post<any>('http://localhost:8080/api/additem' ,item);
  }
 

  getCartbyid(id:any)
  {
    return this.http.get('http://localhost:8080/api/cart/'+id)
  }
 removeitemfromcart(idclient:any,idproduct:any){
  return this.http.delete('http://localhost:8080/api/removeitem/'+idclient+'/'+idproduct)
 }
 removeAllItem(idclient:any){
  return this.http.delete('http://localhost:8080/api/removeallitem/'+idclient)
 }
 addcommande(commande:any){
  return this.http.post('http://localhost:8080/api/addcommande',commande)
 }
 getcommandes(){
  return this.http.get('http://localhost:8080/api/commandes')
 }

 getcommandebyid(idcom:any){
  return this.http.get('http://localhost:8080/api/commande/'+idcom)
 }
 getfacturebyid(id:any){
  return this.http.get('http://localhost:8080/api/commande/'+id)
 }

 getcommandeclient(id:any){
  return this.http.get('http://localhost:8080/api/commande/client/'+id)
 }

 updateCommande(data:any){
   return this.http.put('http://localhost:8080/api/update',data)
 }

}