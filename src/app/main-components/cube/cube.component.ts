import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { combineLatest, filter, firstValueFrom, skip, Subscription, take, tap } from 'rxjs';
import { CalendarComponent } from 'src/app/pages/calendar/calendar/calendar.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SettingsComponent } from 'src/app/pages/settings/settings/settings.component';
import { TodoComponent } from 'src/app/pages/todo/todo/todo.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RouterService } from 'src/app/shared/services/router.service';

export interface CubeSides {
  front?: CubeSide;
  left?: CubeSide;
  right?: CubeSide;
  top?: CubeSide;
  bottom?: CubeSide;
  back?: CubeSide;
}

export interface CubeSide {
  component: any;
  rotationCoordinates: RotationCoordinates;
}

export interface RotationCoordinates {
  rotationX: number;
  rotationY: number;
}

@Component({
  selector: 'app-cube',
  imports: [CommonModule],
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss'],
})
export class CubeComponent implements OnInit, OnDestroy, AfterViewInit {
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);
  private routeService = inject(RouterService);
  private elementRef = inject(ElementRef);

  authService = inject(AuthService);

  private routerSubscription?: Subscription;

  private currentRotationX = 0;
  private currentRotationY = 0;

  private squareSize = 0;

  private rotateAnimationDuration = 400;
  private transitionToCubeDuration = 200;

  containerWidth: number = 0;
  containerHeight: number = 0;

  cubeLimit = 700; // if width or height of this component is smaller than this value, the cube is expanded to a rectangle to utilize more space

  showOverlay = true;
  resizeObserver?: ResizeObserver;
  enableTransitions = false;

  elementSetToCubic = false;

  element?: HTMLElement | null;
  @ViewChild('cube') cube?: ElementRef;
  @ViewChild('squareContainer') squareContainer?: ElementRef;
  private animation?: Animation;

  currentCubeSide?: CubeSide;

  cubeSides: CubeSides = {
    // @todo generate cubeSides out of routerConfig routes, so that route and Component is always correct
    front: {
      component: HomeComponent,
      rotationCoordinates: {
        rotationX: 0,
        rotationY: 0,
      },
    },
    left: {
      component: TodoComponent,
      rotationCoordinates: {
        rotationX: 0,
        rotationY: 90,
      },
    },
    right: {
      component: SettingsComponent,
      rotationCoordinates: {
        rotationX: 0,
        rotationY: -90,
      },
    },
    top: {
      component: CalendarComponent,
      rotationCoordinates: {
        rotationX: -90,
        rotationY: 0,
      },
    },
    bottom: {
      component: HomeComponent,
      rotationCoordinates: {
        rotationX: 90,
        rotationY: 0,
      },
    },
    back: {
      component: TodoComponent,
      rotationCoordinates: {
        rotationX: 0,
        rotationY: 180,
      },
    },
  };

  routeToCubeSideMap = new Map([
    ['/home', this.cubeSides.front],
    ['/todo', this.cubeSides.left],
    ['/settings', this.cubeSides.right],
    ['/calendar', this.cubeSides.top],
    ['/other', this.cubeSides.bottom],
    ['/other2', this.cubeSides.back],
  ]);

  ngOnInit() {
    this.routerSubscription = this.routeService.navigationEnd$.pipe(skip(1)).subscribe((event) => {
      const newCubeSide = this.routeToCubeSideMap.get(event.url);
      if (newCubeSide) {
        this.setAnimation(
          this.currentRotationX,
          this.currentRotationY,
          newCubeSide.rotationCoordinates.rotationX,
          newCubeSide.rotationCoordinates.rotationY
        );
        this.currentRotationX = newCubeSide.rotationCoordinates.rotationX;
        this.currentRotationY = newCubeSide.rotationCoordinates.rotationY;
      }
    });
    // Set up ResizeObserver to get notified of size changes, trigger after initial animation
    this.resizeObserver = new ResizeObserver(() => {
      this.resizeSquare();
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    //  wait until view is initialized, wait for current Route to set CubeSide and until all components fetched their data

    const navigationEnd = this.routeService.navigationEnd$.pipe(
      filter((event) => event instanceof NavigationEnd),
      take(1),
      tap((event: NavigationEnd) => {
        const newCubeSide = this.routeToCubeSideMap.get(event.url);
        if (newCubeSide) {
          // set new Rotation position
          this.currentRotationX = newCubeSide.rotationCoordinates.rotationX;
          this.currentRotationY = newCubeSide.rotationCoordinates.rotationY;
        }
      })
    );

    firstValueFrom(
      combineLatest([
        navigationEnd,
        this.authService.allComponentsReady.asObservable().pipe(filter((ready) => ready === true)),
      ])
    ).then(() => {
      this.setInitialAnimation();
    });
  }

  setInitialAnimation() {
    this.calculateSquareSize();
    this.setToSquare();
    this.setTranslateZValueAndPerspective();
    this.showOverlay = false;
    this.animation = this.initialAnimation(this.currentRotationX, this.currentRotationY, this.squareSize);
    this.animation?.finished.then(() => {
      if (!this.elementSetToCubic) {
        this.changeSizeTransitionAnimation(`${this.containerWidth}px`, `${this.containerHeight}px`).then(() => {
          this.resizeObserver?.observe(this.elementRef.nativeElement);
          this.showOverlay = true;
          this.cdr.detectChanges();
        });
      } else {
        this.resizeObserver?.observe(this.elementRef.nativeElement);
        this.showOverlay = true;
        this.cdr.detectChanges(); // @todo check if needed
      }
    });
  }

  private setAnimation(currentRotationX: number, currentRotationY: number, newRotationX: number, newRotationY: number) {
    this.showOverlay = false;
    this.cdr.detectChanges(); // @todo check if needed
    if (!this.elementSetToCubic && !(this.animation?.playState === 'running')) {
      // transite to cube
      this.changeSizeTransitionAnimation(`${this.squareSize}px`, `${this.squareSize}px`).then(() => {
        // then rotate
        this.rotationAnimation(currentRotationX, currentRotationY, newRotationX, newRotationY).then(() => {
          if (!this.elementSetToCubic) {
            this.changeSizeTransitionAnimation('100%', '100%').then();
          }
        });
      });
    } else {
      this.rotationAnimation(currentRotationX, currentRotationY, newRotationX, newRotationY).then(() => {
        if (!this.elementSetToCubic) {
          this.changeSizeTransitionAnimation('100%', '100%').then();
        }
      });
    }
  }

  private changeSizeTransitionAnimation(width: string, height: string): Promise<any> {
    return new Promise((resolve) => {
      if (!this.squareContainer) {
        resolve(true);

        return;
      }
      this.renderer.setStyle(
        this.squareContainer.nativeElement,
        'transition',
        `width ${this.transitionToCubeDuration}ms, height ${this.transitionToCubeDuration}ms`
      );
      requestAnimationFrame(() => {
        // Now set dimensions
        this.renderer.setStyle(this.squareContainer!.nativeElement, 'width', width);
        this.renderer.setStyle(this.squareContainer!.nativeElement, 'height', height);

        // Clear transition after animation completes
      });
      setTimeout(() => {
        this.renderer.setStyle(this.squareContainer!.nativeElement, 'transition', `none`);
        resolve(true);
      }, this.transitionToCubeDuration - 20);
    });
  }

  private rotationAnimation(
    currentRotationX: number,
    currentRotationY: number,
    newRotationX: number,
    newRotationY: number
  ) {
    // if animation is currently running, set current rotation angles as start point for the new animation
    return new Promise((resolve) => {
      if (this.animation && this.animation.playState === 'running') {
        this.animation?.pause();
        const computedStyle = window.getComputedStyle(this.cube?.nativeElement);
        const transformMatrix = new DOMMatrix(computedStyle.transform);

        // Extract rotation values from the matrix
        // These calculations convert the matrix values to rotation angles
        currentRotationY = -Math.atan2(transformMatrix.m13, transformMatrix.m33) * (180 / Math.PI);
        currentRotationX =
          -Math.atan2(
            -transformMatrix.m23,
            Math.sqrt(transformMatrix.m21 * transformMatrix.m21 + transformMatrix.m22 * transformMatrix.m22)
          ) *
          (180 / Math.PI);
      }

      // set Animation
      console.log('set rotationAnimation');
      this.animation = this.rotateAnimation(currentRotationX, currentRotationY, newRotationX, newRotationY);
      this.animation?.finished.then(() => {
        this.showOverlay = true;
        this.cdr.detectChanges(); // @todo check if needed
        resolve(true);
      });
    });
  }

  private resizeSquare() {
    this.calculateSquareSize();
    if (!this.squareContainer) return;
    if (this.elementSetToCubic) {
      this.setToSquare();
    } else {
      this.setToRectangle();
    }
    this.setTranslateZValueAndPerspective();
  }

  setTranslateZValueAndPerspective() {
    if (!this.cube) return;
    this.cube.nativeElement.style.setProperty('--translate-z-value', `-${this.squareSize / 2}px`);
    this.cube.nativeElement.parentElement.style.setProperty('perspective', `${this.squareSize * 4}px`);
  }

  calculateSquareSize() {
    if (!this.squareContainer) return;
    // Get container dimensions
    this.containerWidth = this.squareContainer.nativeElement.parentElement.clientWidth;
    this.containerHeight = this.squareContainer.nativeElement.parentElement.clientHeight;
    // Calculate the size based on the smaller dimension
    this.squareSize = Math.min(this.containerWidth, this.containerHeight);

    this.elementSetToCubic = this.squareSize > this.cubeLimit;
  }

  setToSquare() {
    if (!this.squareContainer) return;
    this.renderer.setStyle(this.squareContainer.nativeElement, 'width', `${this.squareSize}px`);
    this.renderer.setStyle(this.squareContainer.nativeElement, 'height', `${this.squareSize}px`);
  }

  setToRectangle() {
    if (!this.squareContainer) return;
    this.renderer.setStyle(this.squareContainer.nativeElement, 'width', `100%`);
    this.renderer.setStyle(this.squareContainer.nativeElement, 'height', `100%`);
  }

  initialAnimation(currentRotationX: number, currentRotationY: number, squareSize: number): Animation {
    return this.cube?.nativeElement?.animate(
      [
        {
          transform: `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg) rotate3d(1, 1, 1, 0deg) scale3d(0, 0, 0)`,
          transformOrigin: `center center -${squareSize / 2}px`,
          offset: 0,
        },
        {
          transform: `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg) rotate3d(1, 1, 1, 360deg) scale3d(0.25, 0.25, 0.25)`,
          transformOrigin: `center center -${squareSize / 2}px`,
          offset: 0.25,
        },
        {
          transform: `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg) rotate3d(1, 1, 1, 720deg) scale3d(0.5, 0.5, 0.5)`,
          transformOrigin: `center center -${squareSize / 2}px`,
          offset: 0.5,
        },
        {
          transform: `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg) rotate3d(1, 1, 1, 1080deg) scale3d(1, 1, 1)`,
          transformOrigin: `center center -${squareSize / 2}px`,
          offset: 1,
        },
      ],
      {
        duration: 2000,
        iterations: 1,
        easing: 'ease-out',
        fill: 'forwards',
      }
    );
  }

  rotateAnimation(
    currentRotationX: number,
    currentRotationY: number,
    newRotationX: number,
    newRotationY: number
  ): Animation {
    return this.cube?.nativeElement?.animate(
      [
        {
          transform: `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`,
          transformOrigin: `center center -${this.squareSize / 2}px`,
        },
        {
          transform: `rotateX(${newRotationX}deg) rotateY(${newRotationY}deg)`,
          transformOrigin: `center center -${this.squareSize / 2}px`,
        },
      ],
      {
        duration: this.rotateAnimationDuration,
        iterations: 1,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );
  }
}
