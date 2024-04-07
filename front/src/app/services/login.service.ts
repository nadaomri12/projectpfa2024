import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  isLoggedIn: boolean = false;

  constructor(private http: HttpClient,private router: Router) { }
  login(userObject:any): Observable<any> { 
    return this.http.post<any>(  `api/auth/authenticate`
    ,userObject);
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  signUp(userObject:any): Observable<any> { // La fonction renvoie un tableau d'employés, donc il faut utiliser Observable<Employee[]>
    return this.http.post<any>(  `api/auth/register`,userObject);
  }

 
  signOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

   
 //get all Client
 getAllClient():Observable<any>{
  return this.http.get<[]>(  `api/clients`
  )
}

deleteclient(id:any){
  return this.http.delete(`api/deleteclient/`+id)
}

getClient(id:any):Observable<any>{
  return this.http.get(`api/client/`+id)
}
getSubscribedUsers(): Observable<any[]> {
  return this.http.get<any[]>(`api/subscribed`
  );
}

deleteEmailSubscription(id: number): Observable<void> {
  return this.http.delete<void>(`api/email/${id}`);
}


getAllFaqs():Observable<any>{
  return this.http.get<any[]>('api/faqs')
}
createFaq(faq:any):Observable<any>{
  return this.http.post('api/faqs',faq)
}

removeFaq(id:number):Observable<any>{
  return this.http.delete<any>(`api/faqs/${id}`);
}


getAllQuestions():Observable<any>{
  return this.http.get<any[]>('api/questions')
}

getQuestionsByCatalogueId(catalogueId: number): Observable<any[]> {
  const params = new HttpParams().set('idcatalogue', catalogueId.toString());
  return this.http.get<any[]>('api/questions/catalogue', { params });
}

createQuestion(QuestionDto:any):Observable<any>{
  return this.http.post('api/questions',QuestionDto)}





}
