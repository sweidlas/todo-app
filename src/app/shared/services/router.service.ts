import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  router = inject(Router);

  public navigationEnd$: Observable<NavigationEnd>;
  private navigationSubject = new ReplaySubject<NavigationEnd>(1);

  constructor() {
    // Immediately start listening and feeding the ReplaySubject
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.navigationSubject.next(event);
    });

    // Expose as observable
    this.navigationEnd$ = this.navigationSubject.asObservable();
  }
}
