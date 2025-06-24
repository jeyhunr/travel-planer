import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ForgotPasswordComponent, LoginComponent, RegisterComponent } from './features/auth';
import { ChangePasswordComponent, ManageScubscripriosnComponent } from './features/settings';
import { FeedDetailComponent } from './features/home/feed-detail/feed-detail.component';
import { CreateFalComponent } from './features/home/create-fal/create-fal.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'manage-subscriptions', component: ManageScubscripriosnComponent },
  { path: 'create-fal', component: CreateFalComponent },
  { path: 'feed-detail/:{id}', component: FeedDetailComponent },
];
