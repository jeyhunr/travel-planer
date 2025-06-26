import { Component, input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';

@Component({
  selector: 'ns-card',
  templateUrl: './card.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptLocalizeModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CardComponent {
  imgSrc = input<string>('');
  title = input<string>('');
  description = input<string>('');
  author = input<string>('');
  date = input<string>('');
  id = input<string>('');
}
