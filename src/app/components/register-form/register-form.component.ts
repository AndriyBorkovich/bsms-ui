import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticateResponse, RegistrationRequest} from "../../models/account.dtos";
import {NgForOf, NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {AccountService} from "../../services/account.service";
import {Role} from "../../models/enums";
import {DisableButtonOnSubmitDirective} from "../../directives/n-submit.directive";


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    DisableButtonOnSubmitDirective
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  roles = Object.keys(Role).filter(key => !isNaN(Number(Role[key])));
  constructor(private router: Router,
              private accountService: AccountService,
              private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl(Role.Admin, [Validators.required])
    });
  }
  onCancel() {
    this.router.navigateByUrl('/').then(() => console.log("Returned to home"));
  }

  validateControl = (controlName: string) => {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName).hasError(errorName)
  }

  registerUser = (registerFormValue: any) => {
    const formValues = {...registerFormValue};
    const user: RegistrationRequest = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      role: this.parseRoleText(formValues.role)
    };

    this.accountService.register(user)
      .subscribe({
        next: (result: AuthenticateResponse) => {
          if(result) {
            this.toaster.success("User registered successfully", "Congrats!", {
              timeOut: 5000
            });
            this.router.navigateByUrl('/').then(() => console.log("Navigated to home"));
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.message, "Registration error!", {
            positionClass: 'toast-bottom-right',
            timeOut: 5000
          });
        }
      })
  }

  private parseRoleText(roleText: string) {
    let role: Role;
    switch (roleText) {
      case 'Admin':
        role = Role.Admin;
        break;
      case 'Passenger':
        role = Role.Passenger;
        break;
      case 'Driver':
        role = Role.Driver;
        break;
      default:
        break;
    }

    return role;
  }
}
