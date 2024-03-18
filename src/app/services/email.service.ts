import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendNewsletter(formData: FormData): Observable<any> {
    return this.http.post(`http://localhost:8080/api/mail/send`, formData, {responseType: 'text'});
  }

  subscribeEmail(userId: number, emailSubscription: string): Observable<any> {
    const updateData = { emailSubscription: emailSubscription }; // Créez un objet contenant les données de mise à jour
    return this.http.patch<any>(``, updateData);
  }




}

