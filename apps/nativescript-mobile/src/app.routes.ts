import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ForgotPasswordComponent, LoginComponent, RegisterComponent } from './features/auth';
import { ChangePasswordComponent, ManageScubscripriosnComponent } from './features/settings';
import { FeedDetailComponent } from './features/home/feed-detail/feed-detail.component';
import { CreateFalComponent } from './features/home/create-fal/create-fal.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'manage-subscriptions', component: ManageScubscripriosnComponent, canActivate: [AuthGuard] },
  { path: 'create-fal', component: CreateFalComponent, canActivate: [AuthGuard] },
  { path: 'feed-detail/:{id}', component: FeedDetailComponent, canActivate: [AuthGuard] },
];
