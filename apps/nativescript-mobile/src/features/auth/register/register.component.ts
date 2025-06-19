import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  isPasswordVisible = false;
  isLoading = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onCreateAccount() {
    this.isLoading = true;

    setTimeout(() => (this.isLoading = false), 2000);
    if (this.validateForm()) {
      console.log('Creating account with:', {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
      });
    }
  }

  private validateForm(): boolean {
    if (!this.fullName.trim()) {
      alert('Bitte gib deinen vollständigen Namen ein');
      return false;
    }
    if (!this.email.trim()) {
      alert('Bitte gib deine E-Mail-Adresse ein');
      return false;
    }
    if (!this.password.trim()) {
      alert('Bitte gib ein Passwort ein');
      return false;
    }
    if (this.password.length < 6) {
      alert('Das Passwort muss mindestens 6 Zeichen lang sein');
      return false;
    }
    return true;
  }
}
