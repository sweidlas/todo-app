import { effect, inject, Injectable, signal } from '@angular/core';
import { CREATE_CALENDAR_EVENT_MUTATION } from 'src/app/shared/graphql/mutations/create_calendar_event';
import { DELETE_CALENDAR_EVENT_MUTATION } from 'src/app/shared/graphql/mutations/delete_calendar_event';
import { UPDATE_CALENDAR_EVENT_MUTATION } from 'src/app/shared/graphql/mutations/update_calendar_event';
import { CALENDAR_EVENTS_QUERY } from 'src/app/shared/graphql/queries/calendarEvents';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CalendarEventsQuery } from 'src/generated/graphql';
import { CalendarEvent } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  apiService = inject(ApiService);

  calendarEventsSignal = signal<CalendarEvent[] | undefined>(undefined);

  authService = inject(AuthService);

  constructor() {
    effect(() => {
      if (this.authService.loggedIn() == true) {
        this.authService.registerComponent(this);
        this.calendarEventsQuery();
      }
      if (this.authService.loggedIn() == false) this.cleanService();
    });

    // Subscribe to loading events
    this.authService.loginLoadingTrigger$.subscribe(() => {
      this.authService.registerComponent(this);
      this.calendarEventsQuery();
    });
  }

  cleanService() {
    this.calendarEventsSignal.set(undefined);
  }

  refetch() {
    this.apiService.query({ query: CALENDAR_EVENTS_QUERY }).refetch();
  }

  calendarEventsQuery() {
    this.apiService.query<CalendarEventsQuery>({ query: CALENDAR_EVENTS_QUERY }).valueChanges.subscribe((result) => {
      const events = result.data?.calendarEvents;
      if (events) {
        const mappedEvents: CalendarEvent[] = events.map((event) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          color: event.color || undefined,
          description: event.description || undefined,
          location: event.location || undefined,
        }));
        this.calendarEventsSignal.set(mappedEvents);
        this.authService.setComponentReady(this);
      }
    });
  }

  createCalendarEvent(variables: CalendarEvent) {
    const optimisticResponse = {
      ...variables,
      id: `optimistic-${Date.now()}`,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      __typename: 'CalendarEvent',
    };
    console.log('optimisticResponse', optimisticResponse);

    this.apiService
      .mutate({
        mutation: CREATE_CALENDAR_EVENT_MUTATION,
        variables: variables,
        optimisticResponse: { createCalendarEvent: optimisticResponse },
        update: (cache, { data }) => {
          const existingCalendarEvents: any = cache.readQuery({
            query: CALENDAR_EVENTS_QUERY,
          });
          let data2: any = data;
          cache.writeQuery<CalendarEventsQuery>({
            query: CALENDAR_EVENTS_QUERY,
            data: {
              calendarEvents: [...existingCalendarEvents.calendarEvents, data2.createCalendarEvent],
            },
          });
        },
      })
      .subscribe({
        next: (result) => {
          console.log('create calendarEvent result', result);
        },
        error: (error) => {
          console.error('Mutation failed', error);
          // The optimistic update will be automatically rolled back
        },
      });
  }

  updateCalendarEvent(variables: CalendarEvent) {
    const optimisticResponse = {
      ...variables,
      updated: new Date().toISOString(),
      __typename: 'CalendarEvent',
    };
    console.log('optimisticResponse', optimisticResponse);

    this.apiService
      .mutate({
        mutation: UPDATE_CALENDAR_EVENT_MUTATION,
        variables: variables,
        optimisticResponse: { updateCalendarEvent: optimisticResponse },
        update: (cache, { data }) => {
          const existingCalendarEvents: any = cache.readQuery({
            query: CALENDAR_EVENTS_QUERY,
          });
          let data2: any = data;
          cache.writeQuery<CalendarEventsQuery>({
            query: CALENDAR_EVENTS_QUERY,
            data: {
              calendarEvents: [...existingCalendarEvents.calendarEvents, data2.updateCalendarEvent],
            },
          });
        },
      })
      .subscribe({
        next: (result) => {
          console.log('create calendarEvent result', result);
        },
        error: (error) => {
          console.error('Mutation failed', error);
          // The optimistic update will be automatically rolled back
        },
      });
  }

  deleteCalendarEvent(variables: { id: string }) {
    this.apiService
      .mutate({
        mutation: DELETE_CALENDAR_EVENT_MUTATION,
        variables: variables,
        optimisticResponse: { deleteCalendarEvent: variables },
        update: (cache, { data }) => {
          const existingCalendarEvents: any = cache.readQuery({
            query: CALENDAR_EVENTS_QUERY,
          });
          let data2: any = data;
          cache.writeQuery<CalendarEventsQuery>({
            query: CALENDAR_EVENTS_QUERY,
            data: {
              calendarEvents: existingCalendarEvents.calendarEvents.filter(
                (calendarEvent: CalendarEvent) => calendarEvent.id !== data2.deleteCalendarEvent
              ),
            },
          });
        },
      })
      .subscribe((result) => {
        console.log('delete todo result', result);
      });
  }
}
