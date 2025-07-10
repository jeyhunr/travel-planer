import { Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { CardComponent } from '../../../components';
import { CoffeeReadingService } from '../../../core/services/coffee-reading.service';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { ItemEventData } from '@nativescript/core';

@Component({
  selector: 'ns-history',
  templateUrl: './history.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, CardComponent, NativeScriptLocalizeModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HistoryComponent implements OnInit {
  coffeeReadingService = inject(CoffeeReadingService);

  myPosts = this.coffeeReadingService.historyPosts;
  loading = this.coffeeReadingService.loadingHistory;
  loadingMore = this.coffeeReadingService.loadingHistoryMore;

  ngOnInit(): void {
    this.coffeeReadingService.loadHistory();
  }

  onLoadMore(): void {
    this.coffeeReadingService.loadMoreHistory();
  }

  onItemLoading(e: ItemEventData) {
    console.log('Item Loading Event', e.index);
  }
}
