import { Component, input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

@Component({
  selector: 'ns-teaser',
  templateUrl: './teaser.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TeaserComponent {
  greeting = input<string>('Hi, User!');
  welcomeMessage = input<string>("Welcome back! It's great to see you.");
  emoji = input<string>('👋');
}
