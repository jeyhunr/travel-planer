import { Component, inject, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { TitleComponent } from '../../../components';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { UserService } from '../../../core/services/user.service';
@Component({
  selector: 'ns-change-password',
  templateUrl: './change-password.component.html',
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    TitleComponent,
    NativeScriptLocalizeModule,
    NativeScriptFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ChangePasswordComponent {
  userService = inject(UserService);
  currentPassword = '';
  newPassword = '';
  repeatPassword = '';

  showPassword = false;
  errorMessage = signal('');
  successMessage = signal('');
  isLoading = signal(false);
  showRequiredFields = signal(false);

  onChangePassword() {
    if (!this.validateForm()) {
      this.showRequiredFields.set(true);
      return;
    }

    this.isLoading.set(true);
    this.showRequiredFields.set(false);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.userService
      .updatePassword({
        currentPassword: this.currentPassword,
        password: this.newPassword,
        repeatPassword: this.repeatPassword,
      })
      .subscribe({
        next: (x: { message: string }) => {
          this.isLoading.set(false);
          this.successMessage.set(x.message);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.error.message.message);
        },
      });
  }

  private validateForm(): boolean {
    return (
      this.currentPassword.trim() !== '' && this.newPassword.length >= 6 && this.newPassword === this.repeatPassword
    );
  }
}
