import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  isLoggedIn: boolean = false;

  constructor(private http: HttpClient,private router: Router) { }
  login(userObject:any): Observable<any> { 
    return this.http.post<any>('https://localhost:8080/api/auth/authenticate' ,userObject);
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  signUp(userObject:any): Observable<any> { // La fonction renvoie un tableau d'employés, donc il faut utiliser Observable<Employee[]>
    return this.http.post<any>('http://localhost:8080/api/auth/register',userObject);
  }
 
  signOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
   
 //get all Client
 getAllClient():Observable<any>{
  return this.http.get<[]>('http://localhost:8080/api/clients')
}
deleteclient(id:any){
  return this.http.delete('http://localhost:8080/api/deleteclient/'+id)
}

getClient(id:any):Observable<any>{
  return this.http.get('http://localhost:8080/api/client/'+id)
}
getSubscribedUsers(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8080/api/subscribed');
}
deleteEmailSubscription(id: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:8080/api/email/${id}`);
}

}
