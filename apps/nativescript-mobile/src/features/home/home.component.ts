import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { FeedComponent } from './feed/feed.component';
import { SettingsComponent } from '../settings/settings.component';
import { HistoryComponent } from './history/history.component';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, FeedComponent, SettingsComponent, HistoryComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {
  page = inject(Page);

  constructor() {
    // Setup large titles on iOS
    this.page.on('loaded', (args) => {
      if (__IOS__) {
        const navigationController: UINavigationController = this.page.frame.ios.controller;
        navigationController.navigationBar.prefersLargeTitles = true;
      }
    });
  }
}
