import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { TitleComponent } from '../../../components';

@Component({
  selector: 'ns-change-password',
  templateUrl: './change-password.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, TitleComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  repeatPassword = '';
  errorMessage = '';
  showPassword = false;

  onChangePassword() {
    if (this.validateForm()) {
      if (this.newPassword !== this.repeatPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      console.log('Change password:', this.currentPassword, this.newPassword);
      this.errorMessage = '';
    }
  }

  private validateForm(): boolean {
    if (!this.currentPassword.trim()) {
      return false;
    }
    if (!this.newPassword.trim()) {
      return false;
    }
    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters long.';
      return false;
    }
    return true;
  }
}
