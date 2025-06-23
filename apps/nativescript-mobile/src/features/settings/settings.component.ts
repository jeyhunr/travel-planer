import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';

@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsComponent implements OnInit {
  ngOnInit(): void {
    console.log('FeedComponent initialized');
  }
}
