import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent }
];
