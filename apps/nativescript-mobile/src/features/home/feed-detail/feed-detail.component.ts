import { Component, NO_ERRORS_SCHEMA, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { TitleComponent } from '../../../components';
import { CoffeeReadingService } from '../../../core/services/coffee-reading.service';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';

@Component({
  selector: 'ns-feed-detail',
  templateUrl: './feed-detail.component.html',
  imports: [NativeScriptCommonModule, TitleComponent, NativeScriptLocalizeModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FeedDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  coffeeReadingService = inject(CoffeeReadingService);

  post = this.coffeeReadingService.currentPost;
  loading = this.coffeeReadingService.loadingDetail;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.coffeeReadingService.getPostDetails(id);
    }
  }

  toggleShare() {
    console.log('Share button clicked');
  }
}
