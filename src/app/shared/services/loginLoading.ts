import { signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/generated/graphql';

export class LoginLoading {
  user?: User;

  loggedIn = signal<boolean>(false);
  isLoading = signal<boolean>(true);

  private loginLoadingTrigger = new Subject<void>();
  protected componentStates = new Map<any, boolean>();
  allComponentsReady = new BehaviorSubject<boolean>(false);

  // Observable for components to subscribe to loading events
  loginLoadingTrigger$ = this.loginLoadingTrigger.asObservable();

  // Register a component (call this in component's ngOnInit)
  registerComponent(component: any): void {
    this.componentStates.set(component, false);
  }

  // Unregister a component (call this in component's ngOnDestroy)
  unregisterComponent(component: any): void {
    this.componentStates.delete(component);
    this.checkAllComponentsReady();
  }

  // Component calls this when loading is finished
  setComponentReady(component: any): void {
    this.componentStates.set(component, true);
    this.checkAllComponentsReady();
  }

  // Trigger loading for all components
  triggerLoading(): void {
    console.log('triggerLoading()');
    // Reset all component states
    this.componentStates.forEach((_, component) => {
      this.componentStates.set(component, false);
    });

    // Reset allComponentsReady to false
    this.allComponentsReady.next(false);

    // Emit loading event
    this.loginLoadingTrigger.next();
  }

  private checkAllComponentsReady(): void {
    const allReady = Array.from(this.componentStates.values()).every((ready) => ready);

    // Execute your function when all components are ready
    if (allReady && this.componentStates.size > 0) {
      this.isLoading.set(false);
      this.allComponentsReady.next(allReady);
    }
  }
}
