import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface LoadingState {
  isLoading: boolean;
  message: string;
  progress: number;
}

@Component({
  selector: 'app-ocean-loading',
  imports: [CommonModule],
  template: `
    <div class="ocean-loading-container">
      <div class="content-overlay">
        <div class="loading-content">
          <div class="loading-title">{{ loadingMessage }}</div>
        </div>
      </div>

      <!-- Wave Layers -->
      <div class="waves-container">
        <!-- Deep Ocean Wave -->
        <div class="wave-layer deep-ocean-wave">
          <svg viewBox="0 0 800 320" preserveAspectRatio="none">
            <path [attr.d]="deepOceanPath" [attr.fill]="deepOceanColor" [attr.opacity]="0.3" />
          </svg>
        </div>

        <!-- Main Ocean Wave -->
        <div class="wave-layer main-ocean-wave">
          <svg viewBox="0 0 800 320" preserveAspectRatio="none">
            <path [attr.d]="mainOceanPath" [attr.fill]="mainOceanColor" [attr.opacity]="0.5" />
          </svg>
        </div>

        <!-- Surface Wave -->
        <div class="wave-layer surface-wave">
          <svg viewBox="0 0 800 320" preserveAspectRatio="none">
            <path [attr.d]="mainOceanPath" [attr.fill]="surfaceColor" [attr.opacity]="0.7" />
          </svg>
        </div>

        <!-- Foam Wave -->
        <div class="wave-layer foam-wave">
          <svg viewBox="0 0 800 320" preserveAspectRatio="none">
            <defs>
              <linearGradient id="foamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="40%" stop-color="#e0f2fe" />
                <stop offset="100%" stop-color="#0ea5e9" />
              </linearGradient>
            </defs>
            <path [attr.d]="deepOceanPath" fill="url(#foamGradient)" [attr.opacity]="0.8" />
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .ocean-loading-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(
          120deg,
          rgba(131, 58, 180, 1) 0%,
          rgba(253, 29, 29, 1) 50%,
          rgba(252, 176, 69, 1) 100%
        );
        overflow: hidden;
        z-index: 9999;
      }

      .content-overlay {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: white;
      }

      .loading-content {
        text-align: center;
        margin-bottom: 6rem;
      }

      .loading-title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }

      .progress-container {
        width: 20rem;
        height: 0.75rem;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 9999px;
        margin: 0 auto;
        overflow: hidden;
      }

      .progress-bar {
        height: 100%;
        background-color: white;
        border-radius: 9999px;
        transition: width 0.3s ease;
      }

      .waves-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .wave-layer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
      }

      .deep-ocean-wave {
        height: 200px;
      }

      .deep-ocean-wave svg {
        position: absolute;
        bottom: 0;
        width: 200%;
        height: 100%;
        animation: moveWave 9s linear infinite;
        will-change: transform;
        overflow: hidden; /* Ensures clipping */
        contain: layout style paint; /* Limits rendering scope */
      }

      .main-ocean-wave {
        height: 180px;
      }

      .main-ocean-wave svg {
        position: absolute;
        bottom: 0;
        width: 200%;
        height: 100%;
        animation: moveWave 12s linear infinite;
        will-change: transform;
        overflow: hidden; /* Ensures clipping */
        contain: layout style paint; /* Limits rendering scope */
      }

      .surface-wave {
        height: 160px;
      }

      .surface-wave svg {
        position: absolute;
        bottom: 0;
        width: 200%;
        height: 100%;
        animation: moveWave 8s linear infinite;
        will-change: transform;
        overflow: hidden; /* Ensures clipping */
        contain: layout style paint; /* Limits rendering scope */
      }

      .foam-wave {
        height: 140px;
      }

      .foam-wave svg {
        position: absolute;
        bottom: 0;
        width: 200%;
        height: 100%;
        animation: moveWave 7s linear infinite;
        will-change: transform;
        overflow: hidden; /* Ensures clipping */
        contain: layout style paint; /* Limits rendering scope */
      }

      @keyframes moveWave {
        0% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .loading-title {
          font-size: 1.5rem;
        }

        .progress-container {
          width: 16rem;
        }
      }

      @media (max-width: 480px) {
        .loading-title {
          font-size: 1.25rem;
        }

        .progress-container {
          width: 12rem;
        }
      }
    `,
  ],
})
export class OceanLoadingComponent {
  @Input() loadingMessage: string | undefined = 'Loading Ocean Data...';
  @Input() progress: number | undefined = 60;
  @Input() backgroundColor: string = 'linear-gradient(to bottom, #e0f2fe, #93c5fd)';
  @Input() deepOceanColor: string = '#1e3a8a';
  @Input() mainOceanColor: string = '#1e40af';
  @Input() surfaceColor: string = '#2563eb';

  // Wave path definitions

  deepOceanPath = `M0,80
  C50,80 100,50 150,30
  C180,20 220,25 250,40
  C300,80 350,80 400,80
  C450,80 500,50 550,30
  C580,20 620,25 650,40
  C700,80 750,80 800,80
  L800,320 L0,320 Z`;

  mainOceanPath = `M0,80
    C25,80 50,50 75,30
    C90,20 110,25 125,40
    C150,80 175,80 200,80
    C225,80 250,50 275,30
    C290,20 310,25 325,40
    C350,80 375,80 400,80
    C425,80 450,50 475,30
    C490,20 510,25 525,40
    C550,80 575,80 600,80
    C625,80 650,50 675,30
    C690,20 710,25 725,40
    C750,80 775,80 800,80
    L800,320 L0,320 Z`;
}
