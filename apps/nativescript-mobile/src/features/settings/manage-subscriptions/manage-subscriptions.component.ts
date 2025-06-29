import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { Utils } from '@nativescript/core';
import { TitleComponent } from '../../../components';

@Component({
  selector: 'ns-manage-subscriptions',
  templateUrl: './manage-subscriptions.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, TitleComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ManageScubscripriosnComponent {
  newCoupon = '';
  coupons = [
    { code: 'WELCOME10', status: 'Aktiv' },
    { code: 'SUMMER25', status: 'Verwendet' },
  ];

  addCoupon() {
    if (this.newCoupon.trim() === '') return;

    this.coupons.unshift({
      code: this.newCoupon.trim(),
      status: 'Aktiv',
    });

    this.newCoupon = '';
  }

  openUrl(url: string) {
    Utils.openUrl(url);
  }
}
