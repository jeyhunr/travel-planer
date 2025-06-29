import { Component, inject, input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-title',
  templateUrl: './title.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TitleComponent {
  router = inject(RouterExtensions);
  title = input<string>('');

  goBack() {
    this.router.navigate(['home'], {
      transition: {
        name: 'slideRight',
      },
    });
  }
}
