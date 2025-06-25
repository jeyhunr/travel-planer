import { Component, inject, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  NativeScriptRouterModule,
  RouterExtensions,
} from '@nativescript/angular';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule, NativeScriptLocalizeModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(RouterExtensions);
  email = '';
  username = '';
  firstName = '';
  lastName = '';
  password = '';
  repeadPassword = '';
  isPasswordVisible = false;

  errorMessage = signal('');
  isLoading = signal(false);
  showRequiredFields = signal(false);

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onCreateAccount() {
    if (!this.validateForm()) {
      this.showRequiredFields.set(true);
      return;
    }

    this.isLoading.set(true);
    this.showRequiredFields.set(false);
    this.errorMessage.set('');

    this.authService
      .register({
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        repeatPassword: this.repeadPassword,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
          this.isLoading.set(false);
          this.errorMessage.set(error.error.message.message);
        },
      });
  }

  private validateForm(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.password.length >= 6 &&
      this.password === this.repeadPassword
    );
  }
}
