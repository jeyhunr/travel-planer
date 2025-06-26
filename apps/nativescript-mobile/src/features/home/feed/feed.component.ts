import { Component, computed, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { CardComponent } from '../../../components';
import { TeaserComponent } from '../../../components/teaser/teaser.component';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { AuthService } from '../../../core/services/auth.service';
import { CoffeeReadingService } from '../../../core/services/coffee-reading.service';
@Component({
  selector: 'ns-feed',
  templateUrl: './feed.component.html',
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptLocalizeModule,
    CardComponent,
    TeaserComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FeedComponent implements OnInit {
  authService = inject(AuthService);
  coffeeReadingService = inject(CoffeeReadingService);

  greeting = computed(() => {
    const user = this.authService.user();
    return user?.username || 'Guest';
  });

  myPosts = this.coffeeReadingService.posts;
  loading = this.coffeeReadingService.loading;
  loadingMore = this.coffeeReadingService.loadingMore;

  ngOnInit(): void {
    this.coffeeReadingService.loadPosts();
  }

  onLoadMore(): void {
    this.coffeeReadingService.loadMorePosts();
  }
}
