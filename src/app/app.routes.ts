import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BusesViewComponent } from './components/features/buses/buses-view/buses-view.component';
import { CreateBusComponent } from './components/features/buses/create-bus/create-bus.component';
import { RoleGuard } from './guards/role.guard';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './components/error-pages/server-error/server-error.component';
import { UnauthorizedComponent } from './components/error-pages/unauthorized/unauthorized.component';
import { PassengersViewComponent } from './components/features/passengers/passengers-view/passengers-view.component';
import { DriversViewComponent } from './components/features/drivers/drivers-view/drivers-view.component';
import { CompaniesViewComponent } from './components/features/companies/companies-view/companies-view.component';
import { TripsViewComponent } from './components/features/trips/trips-view/trips-view.component';
import { StatsViewComponent } from './components/features/statistics/stats-view/stats-view.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  {
    path: 'buses',
    component: BusesViewComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['Admin', 'Passenger', 'Driver'] },
  },
  {
    path: 'create-bus',
    component: CreateBusComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['Admin'] },
  },
  {
    path: 'passengers',
    component: PassengersViewComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['Admin', 'Driver'] },
  },
  {
    path: 'drivers',
    component: DriversViewComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['Admin']},
  },
  {
    path: 'companies',
    component: CompaniesViewComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['Admin']},
  },
  {
    path: 'trips',
    component: TripsViewComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['Admin', 'Passenger', 'Driver']},
  },
  {
    path: 'stats',
    component: StatsViewComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['Admin']},
  },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'no-acess', component: UnauthorizedComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];
