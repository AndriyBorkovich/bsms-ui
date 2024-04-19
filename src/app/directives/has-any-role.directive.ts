import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../services/account.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the roles passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *appHasAnyRole="'ROLE_VALUE'">...</some-element>
 *
 *     <some-element *appHasAnyRole="['ROLE_VALUE_1', 'ROLE_VALUE_2']">...</some-element>
 * ```
 */
@Directive({
  selector: '[hasAnyRole]',
  standalone: true
})
export class HasAnyAppRoleComponentDirective {
  private roles: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private accountService: AccountService // Inject your AccountService here
  ) {}

  //!!! should be the same as name as selector
  @Input()
  set hasAnyRole(value: string | string[]) {
    this.roles = typeof value === 'string' ? [value] : value;
    this.updateView();
    
    // Subscribe to changes in authentication state
    this.accountService.currentUser$.subscribe(() => {
      this.updateView();
    });
  }

  private updateView(): void {
    const hasAnyRole = this.checkRole(this.roles);
    
    this.viewContainerRef.clear();
    if (hasAnyRole) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
  
  private checkRole(roles: string[] | string): boolean {
    const userRole = this.accountService.getCurrentRole();
    if(userRole == null){
      return false;
    }


    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    return roles.includes(userRole);
  }
}