import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url=environment.apiURL

  constructor(private http: HttpClient) { }

  sendNewsletter(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}/mail/send`, formData, {responseType: 'text'});
  }

  subscribeEmail(userId: number, emailSubscription: string): Observable<any> {
    const updateData = { emailSubscription: emailSubscription }; // Créez un objet contenant les données de mise à jour
    return this.http.patch<any>(  `${this.url}/users/email/${userId}`
    , updateData);
  }





}