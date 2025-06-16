import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
@Component({
  imports: [RouterModule, MenubarModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web';

  items = [
    { label: 'Home', path: '', icon: 'pi pi-home' },
    { label: 'About', path: 'about', icon: 'pi pi-info-circle' },
  ];
}
