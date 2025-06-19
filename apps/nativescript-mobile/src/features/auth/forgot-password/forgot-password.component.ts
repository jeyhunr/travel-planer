import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';

@Component({
  selector: 'ns-forgot-password',
  templateUrl: './forgot-password.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ForgotPasswordComponent {
  email = '';
  isLoading = false;

  onForgotPassword() {
    this.isLoading = true;

    setTimeout(() => (this.isLoading = false), 2000);
    // Implement password reset logic here
    if (!this.email.trim()) {
      alert('Bitte gib deine E-Mail-Adresse ein');
      return;
    }
    alert('Password reset email sent successfully');
  }
}
