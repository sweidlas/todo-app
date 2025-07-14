import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingState, OceanLoadingComponent } from 'src/app/shared/components/ocean-loading';
import { AuthService } from 'src/app/shared/services/auth.service';

import { CubeComponent } from '../cube/cube.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-view-main',
  imports: [CommonModule, RouterOutlet, NavigationBarComponent, CubeComponent, OceanLoadingComponent],
  templateUrl: './view-main.component.html',
  styleUrls: ['./view-main.component.scss'],
})
export class ViewMainComponent {
  authService = inject(AuthService);
  imageRef = viewChild<ElementRef<HTMLImageElement>>('imageRef');

  message = 'Loading Data...';

  loadingState: LoadingState | null = {
    isLoading: true,
    message: this.message,
    progress: 60,
  };

  constructor() {
    this.authService.registerComponent(this);
    effect(() => {
      const imgElement = this.imageRef()?.nativeElement;
      if (imgElement) {
        if (imgElement.complete && imgElement.naturalWidth > 0) {
          console.log('Image was already loaded (cached)');
          this.authService.setComponentReady(this);
        }
      }
    });
  }

  onImageLoad() {
    this.authService.setComponentReady(this);
  }
}
