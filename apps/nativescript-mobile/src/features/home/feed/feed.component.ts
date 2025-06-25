import { Component, computed, inject, NO_ERRORS_SCHEMA, OnInit, signal } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { CardComponent } from '../../../components';
import { TeaserComponent } from '../../../components/teaser/teaser.component';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { AuthService } from '../../../core/services/auth.service';
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
export class FeedComponent {
  authService = inject(AuthService);

  greeting = computed(() => {
    const user = this.authService.user();
    return user?.username || 'Guest';
  });

  myPosts = [
    {
      id: 1,
      imgSrc: '~/assets/images/coffee-cup.png',
      title: '"You will soon find clarity in a complex situation."',
      date: 'June 10, 2025',
      author: 'rahimlijeyhun',
    },
    {
      id: 2,
      imgSrc: '~/assets/images/coffee-cup.png',
      title: '"A decision from the past will bring rewards."',
      date: 'May 28, 2025',
      author: 'rahimlijeyhun',
    },
  ];
}
