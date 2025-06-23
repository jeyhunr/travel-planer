import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';

@Component({
  selector: 'ns-card',
  templateUrl: './card.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CardComponent {
  @Input() imgSrc = '';
  @Input() title = '';
  @Input() description = '';
  @Input() author = '';
  @Input() date = '';
}
