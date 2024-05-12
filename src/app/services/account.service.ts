import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { LoginRequest, RegistrationRequest } from '../models/account.dtos';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { ViewCountService } from './view-count.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = `${environment.apiUrl}auth`;

  private currentUserSource = new BehaviorSubject<User | null>(null);

  currentUser$: Observable<User> = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private viewCountService: ViewCountService,
    private jwtHelper: JwtHelperService
  ) {}

  logIn(model: LoginRequest) {
    return this.http.post<User>(`${this.baseUrl}/Login`, model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.viewCountService.notifyWatching();
        }

        return user;
      })
    );
  }

  isLoggedIn(): boolean {
    let currentUser: User | null = this.getCurrentUser();

    this.viewCountService.checkCurrent();

    return (
      currentUser !== null && !this.jwtHelper.isTokenExpired(currentUser.token)
    );
  }

  register(model: RegistrationRequest) {
    return this.http.post<User>(`${this.baseUrl}/Register`, model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.viewCountService.notifyWatching();
        }

        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.viewCountService.notifyUnwatching();
  }

  getCurrentUser() {
    let user: User | null = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  getCurrentRole(): string | null {
    const curentUser = this.getCurrentUser();
    if (curentUser == null) {
      return null;
    }

    const tokenPayload: any = jwtDecode(curentUser.token);
    if (tokenPayload == null) {
      return null;
    }

    return tokenPayload.Role;
  }
}
