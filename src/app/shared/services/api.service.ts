import { inject, Injectable } from '@angular/core';
import { Apollo, QueryRef, WatchQueryOptions } from 'apollo-angular';
import { EmptyObject, MutationOptions, MutationResult } from 'apollo-angular/types';
import { Observable } from 'rxjs';

export enum AuthState {
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apollo = inject(Apollo);

  query<T>(options: WatchQueryOptions<EmptyObject, T>): QueryRef<T, EmptyObject> {
    return this.apollo.watchQuery<T>(options);
  }

  mutate<T>(options: MutationOptions<T, EmptyObject>): Observable<MutationResult<T>> {
    return this.apollo.mutate<T>(options);
  }

  deleteCache() {
    this.apollo.client.clearStore();
  }
}
