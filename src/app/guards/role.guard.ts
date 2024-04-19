import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(public accountService: AccountService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.accountService.isLoggedIn()) {
      this.router
        .navigateByUrl('/login')
        .then(() =>
          console.log('User is not logged in or his time expired')
        );
        return false;
    }

    // this will be passed from the route config on the data property
    const expectedRoles: string[] = route.data['expectedRoles'];
    const curentUserRole = this.accountService.getCurrentRole();

    let hasExpectedRole = false;
    expectedRoles.forEach((expectedRole) => {
      if (curentUserRole == expectedRole) {
        hasExpectedRole = true;
        console.log('Can pass');
      }
    });

    if (!hasExpectedRole) {
      this.router
        .navigateByUrl('/')
        .then(() => console.log('User does not have required role'));
      return false;
    }

    return true;
  }
}
