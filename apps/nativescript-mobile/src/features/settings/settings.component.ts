import { Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptLocalizeModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
