import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <h1 class="text-center font-medium text-5xl mt-20 mb-10">Welcome to BSMS!</h1>
    <div *ngIf="!loggedIn" class="flex max-w-sm mx-auto">
        <button type="submit" name="signInButton" class="submit-btn mr-5" (click)="handleRegisterClick()">Register</button>
        <button type="submit" name="signUpButton" class="submit-btn" (click)="handleLoginClick()">Login</button>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  loggedIn: boolean = false;
  constructor(private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.loggedIn = this.accountService.isLoggedIn();
  }

  handleRegisterClick() {
    this.router.navigateByUrl('/register').then(() => console.log("Moved to registration"));
  }

  handleLoginClick() {
    this.router.navigateByUrl('/login').then(() => console.log("Moved to login"));
  }
}
