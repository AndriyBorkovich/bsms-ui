import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { LoginRequest, RegistrationRequest } from '../models/account.dtos';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<User | null>(null);

  // $ sign claims this is observable
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  logIn(model: LoginRequest) {
    return this.http.post<User>(`${this.baseUrl}auth/Login`, model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }

        return user;
      })
    );
  }

  isLoggedIn(): boolean {
    let currentUser: User | null = this.getCurrentUser();
    this.currentUserSource.next(currentUser);
    return (
      currentUser !== null && !this.jwtHelper.isTokenExpired(currentUser.token)
    );
  }

  register(model: RegistrationRequest) {
    return this.http.post<User>(`${this.baseUrl}auth/Register`, model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }

        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getCurrentUser() {
    let user: User | null = JSON.parse(localStorage.getItem('user'));
    this.currentUserSource.next(user);
    return user;
  }
}
