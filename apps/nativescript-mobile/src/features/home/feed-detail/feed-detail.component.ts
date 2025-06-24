import { Component, NO_ERRORS_SCHEMA, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { Utils } from '@nativescript/core';
import { TitleComponent } from '../../../components';

@Component({
  selector: 'ns-feed-detail',
  templateUrl: './feed-detail.component.html',
  imports: [NativeScriptCommonModule, TitleComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FeedDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  post = {
    imgSrc: '~/assets/images/coffee-cup.png',
    text: '"You will soon find clarity in a complex situation."',
    date: 'June 10, 2025',
    shared: true,
  };

  toggleShare() {
    this.post.shared = !this.post.shared;

    if (this.post.shared) {
      console.log('Wird jetzt geteilt');
      Utils.openUrl('https://rahimli.net/share-link');
    } else {
      console.log('Nicht mehr geteilt');
    }
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;

    console.log(id);
  }
}
