import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticateResponse, LoginRequest, RegistrationRequest} from "../../models/account.dtos";
import {HttpErrorResponse} from "@angular/common/http";
import {NgIf} from "@angular/common";
import { DisableButtonOnSubmitDirective } from 'src/app/directives/n-submit.directive';
import { ViewCountService } from 'src/app/services/view-count.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    DisableButtonOnSubmitDirective
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  constructor(private router: Router,
              private accountService: AccountService,
              private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onCancel() {
    this.router.navigateByUrl('/').then(() => console.log("Returned to home"));
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName).hasError(errorName)
  }

  loginUser = (loginFormValue: any) => {
    const formValues = {...loginFormValue};
    const user: LoginRequest = {
      username: formValues.username,
      password: formValues.password,
    };

    this.accountService.logIn(user)
      .subscribe({
        next: (result: AuthenticateResponse) => {
          if(result) {
            this.toaster.success("User logged in successfully", "Congrats!", {
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
}
