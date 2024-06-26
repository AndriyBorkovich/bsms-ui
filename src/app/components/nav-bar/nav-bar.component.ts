import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user';
import { HasAnyAppRoleDirective } from 'src/app/directives/has-any-role.directive';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf,
    HasAnyAppRoleDirective,
  ],
  templateUrl: './nav-bar.component.html',
  styles: ``,
})
export class NavBarComponent implements OnInit {
  currentUser: User;
  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit() {
    this.currentUser = this.accountService.getCurrentUser();
  }

  onLogOutClick() {
    this.accountService.logout();
    this.router.navigateByUrl('/').then(() => console.log('Logged out'));
    window.location.reload();
  }
}
