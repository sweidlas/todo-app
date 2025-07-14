import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppIcon } from 'src/app/shared/app-icons';

@Component({
  selector: 'app-navigation-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  navItems = [
    {
      name: 'Todo',
      route: '/todo',
      icon: AppIcon.Bootstrap,
    },
    {
      name: 'Home',
      route: '/home',
      icon: AppIcon.Bootstrap,
    },
    {
      name: 'Settings',
      route: '/settings',
      icon: AppIcon.Bootstrap,
    },
    {
      name: 'Calendar',
      route: '/calendar',
      icon: AppIcon.Bootstrap,
    },
  ];

  // @todo check if necessary

  // Optional: Detect virtual keyboard on mobile
  @HostListener('window:resize', ['$event'])
  onResize() {
    // This is a simple heuristic - if the viewport height suddenly becomes much smaller,
    // it's likely the keyboard has appeared
    const viewportHeight = window.innerHeight;
    const bodyElement = document.querySelector('body');

    if (viewportHeight < 500 && window.innerWidth < 768) {
      bodyElement?.classList.add('keyboard-visible');
    } else {
      bodyElement?.classList.remove('keyboard-visible');
    }
  }
}
