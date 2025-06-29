import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { PageRouterOutlet } from '@nativescript/angular';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  imports: [PageRouterOutlet, NativeScriptLocalizeModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppComponent {}
