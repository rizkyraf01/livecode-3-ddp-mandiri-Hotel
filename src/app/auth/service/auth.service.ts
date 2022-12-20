import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response.modul';
import { Login, LoginResponse } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage: Storage = sessionStorage;


  login(payload: Login): Observable<LoginResponse | null> {
    return new Observable<LoginResponse | null>(
      (observer: Observer<LoginResponse | null>) => {
        try {
          const { email, password } = payload;
          if (email === 'rizkyraf46@gmail.com' && password === 'password') {
            const loginResponse: LoginResponse = {
              email: email,
              accessToken: '12345',
            };
            this.storage.setItem('token', JSON.stringify(loginResponse));
            observer.next(loginResponse);
          } else {
            observer.next(null);
          }
        } catch (error: any) {
          observer.error(error.message);
        }
      }
    );
  }
}
