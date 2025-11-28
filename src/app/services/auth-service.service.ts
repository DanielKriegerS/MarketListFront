import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  endpoint: string =  `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
      return this.http.post<{accessToken: string}>(`${this.endpoint}/login`, {username, password})
      .pipe(
        tap(response => {
          localStorage.setItem('authToken', response.accessToken);
        })  
      );
    }

    register(username: string, password: string) {
      return this.http.post<{message: string}>(`${this.endpoint}/register`, {username, password});
    }
}
