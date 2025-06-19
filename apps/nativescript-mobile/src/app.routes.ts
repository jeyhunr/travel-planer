import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ForgotPasswordComponent, LoginComponent, RegisterComponent } from './features/auth';
import { ChangePasswordComponent, ManageScubscripriosnComponent } from './features/settings';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'manage-subscriptions', component: ManageScubscripriosnComponent },
];
