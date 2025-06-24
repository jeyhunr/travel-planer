import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule, RouterExtensions } from '@nativescript/angular';
import { Utils } from '@nativescript/core';

@Component({
  selector: 'ns-manage-subscriptions',
  templateUrl: './manage-subscriptions.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ManageScubscripriosnComponent {
  newCoupon = '';
  coupons = [
    { code: 'WELCOME10', status: 'Aktiv' },
    { code: 'SUMMER25', status: 'Verwendet' },
  ];

  constructor(private router: RouterExtensions) {}
  addCoupon() {
    if (this.newCoupon.trim() === '') return;

    this.coupons.unshift({
      code: this.newCoupon.trim(),
      status: 'Aktiv',
    });

    this.newCoupon = '';
  }

  goBack() {
    this.router.navigate(['home'], {
      transition: {
        name: 'slideRight',
      },
    });
  }

  openUrl(url: string) {
    Utils.openUrl(url);
  }
}
