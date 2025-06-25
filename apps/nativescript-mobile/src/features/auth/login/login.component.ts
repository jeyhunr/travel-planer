import { Component, NO_ERRORS_SCHEMA, signal, inject } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  NativeScriptRouterModule,
  RouterExtensions,
} from '@nativescript/angular';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule, NativeScriptLocalizeModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(RouterExtensions);
  email = '';
  password = '';
  isPasswordVisible = false;

  errorMessage = signal('');
  isLoading = signal(false);
  showRequiredFields = signal(false);

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onLogin() {
    if (!this.validateForm()) {
      this.showRequiredFields.set(true);
      return;
    }

    this.isLoading.set(true);
    this.showRequiredFields.set(false);
    this.errorMessage.set('');

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.error.message.message);
      },
    });
  }

  private validateForm(): boolean {
    if (!this.email.trim()) {
      return false;
    }
    if (!this.password.trim()) {
      return false;
    }
    return true;
  }
}
