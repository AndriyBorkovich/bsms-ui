import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ViewCountService } from 'src/app/services/view-count.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="mt-20">
      <p class="text-white text-center mt-20 text-7xl font-bold">
        Welcome to BSMS!
      </p>
      <p class="text-center text-lg mt-8 mx-10 text-gray-700">
        Manage your station efficiently with our Bus Station Management System
        (BSMS).<br />
        It provides a comprehensive platform for users to streamline their
        operations,<br />
        track schedules, manage routes, and ensure a seamless experience for
        passengers.
      </p>
      @if (!loggedIn) {
      <div class="flex max-w-sm mx-auto">
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
      } @else {
      <p class="text-center text-lg text-white">
        Current users on site: {{ usersCount }}
      </p>
      }
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  usersCount: number = 1;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private viewCountService: ViewCountService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.accountService.isLoggedIn();

    this.viewCountService.receive().subscribe((result) => {
      this.usersCount = result;
    });
  }

  ngOnDestroy(): void {
    //this.viewCountService.notifyUnwatching();
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
