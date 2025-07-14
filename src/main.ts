import { provideHttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { InMemoryCache } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AUTH_CONFIG } from './app/shared/config/auth.config';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      // Combine auth link with http link
      const link = authLink.concat(
        httpLink.create({
          uri: `${environment.apiUrl}/graphql`,
        })
      );

      return {
        link,
        cache: new InMemoryCache(),
        // other options...
      };
    }),
  ],
}).catch((err) => console.error(err));
