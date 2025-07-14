import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Display } from './app.routes';
import { ViewMainComponent } from './main-components/view-main/view-main.component';
import { RouterService } from './shared/services/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, ViewMainComponent, RouterOutlet],
  standalone: true,
})
export class AppComponent {
  title = 'schulmeister';

  router = inject(Router);
  route = inject(ActivatedRoute);
  routerService = inject(RouterService); // injected here so it can emit the route when logging in

  viewMain = false;

  constructor() {
    registerLocaleData(localeDe, 'de-DE');

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      // Get the activated route
      let route = this.route;
      while (route.firstChild) {
        route = route.firstChild;
      }

      // Access the route data
      let currentScreen = route.snapshot.data['screen'] || '';
      currentScreen = currentScreen as unknown as Display;
      switch (currentScreen) {
        case Display.Screen:
          return (this.viewMain = false);
        case Display.Cube:
          return (this.viewMain = true);
        default:
          return (this.viewMain = true);
      }
    });
  }
}
