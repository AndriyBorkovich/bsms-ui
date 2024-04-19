import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="mt-20">
      <p class="text-white text-center mt-20 text-7xl font-bold">Welcome to BSMS!</p>
      <p class="text-center text-lg mt-8 mx-10 text-gray-700">
        Manage your station efficiently with our Bus Station Management System (BSMS).<br />
        It provides a comprehensive platform for users to streamline their operations,<br />
        track schedules, manage routes, and ensure a seamless experience for passengers.
      </p>
      <div *ngIf="!loggedIn" class="flex max-w-sm mx-auto">
        <button
          type="submit"
          name="signInButton"
          class="submit-btn mr-5"
          (click)="handleRegisterClick()"
        >
          Register
        </button>
        <button
          type="submit"
          name="signUpButton"
          class="submit-btn"
          (click)="handleLoginClick()"
        >
          Login
        </button>
      </div>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loggedIn = this.accountService.isLoggedIn();
  }

  handleRegisterClick() {
    this.router
      .navigateByUrl('/register')
      .then(() => console.log('Moved to registration'));
  }

  handleLoginClick() {
    this.router
      .navigateByUrl('/login')
      .then(() => console.log('Moved to login'));
  }
}
