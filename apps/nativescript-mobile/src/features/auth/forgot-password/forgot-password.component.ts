import { Component, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';

@Component({
  selector: 'ns-forgot-password',
  templateUrl: './forgot-password.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule, NativeScriptLocalizeModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ForgotPasswordComponent {
  email = '';
  isLoading = signal(false);
  showRequiredFields = signal(false);
  errorMessage = signal('');

  onForgotPassword() {
    if (!this.email.trim()) {
      this.showRequiredFields.set(true);
      return;
    }

    // @TODO: Send password reset email to the provided email address
  }
}
