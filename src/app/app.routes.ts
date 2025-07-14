import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { CalendarComponent } from './pages/calendar/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { TodoComponent } from './pages/todo/todo/todo.component';
import { authGuard } from './shared/guards/auth.guard';

export enum Display {
  Screen = 'screen',
  Cube = 'cube',
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'auth/:mode',
    component: AuthComponent,
    data: {
      screen: Display.Screen,
    },
  },
  {
    path: 'auth',
    redirectTo: 'auth/login', // Optional: default mode
    pathMatch: 'full',
  },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'todo', component: TodoComponent, canActivate: [authGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '', canActivate: [authGuard] }, // Wildcard route for 404
];
