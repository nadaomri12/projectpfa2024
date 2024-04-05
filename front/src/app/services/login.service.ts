import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url=environment.apiURL

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient,private router: Router) { }
  login(userObject:any): Observable<any> { 
    return this.http.post<any>(  `${this.url}/auth/authenticate`
    ,userObject);
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  signUp(userObject:any): Observable<any> { // La fonction renvoie un tableau d'employés, donc il faut utiliser Observable<Employee[]>
    return this.http.post<any>(  `${this.url}/auth/register`
    ,userObject);
  }

 
  signOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

   
 //get all Client
 getAllClient():Observable<any>{
  return this.http.get<[]>(  `${this.url}/clients`
  )
}

deleteclient(id:any){
  return this.http.delete(`${this.url}/deleteclient`+id)
}

getClient(id:any):Observable<any>{
  return this.http.get(`${this.url}/client`
  +id)
}
getSubscribedUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/subscribed`
  );
}

deleteEmailSubscription(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/email/${id}`);
}

}
