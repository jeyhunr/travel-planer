import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { CardComponent } from '../../../components';

@Component({
  selector: 'ns-history',
  templateUrl: './history.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, CardComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HistoryComponent implements OnInit {
  ngOnInit(): void {
    console.log('History initialized');
  }

  myPosts = [
    {
      imgSrc: '~/assets/images/coffee-cup.png',
      title: '"You will soon find clarity in a complex situation."',
      date: 'June 10, 2025',
    },
    {
      imgSrc: '~/assets/images/coffee.jpg',
      title: '"A decision from the past will bring rewards."',
      date: 'May 28, 2025',
    },
  ];
}
