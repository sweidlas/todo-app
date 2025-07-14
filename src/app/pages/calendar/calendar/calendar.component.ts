import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Todo } from 'src/generated/graphql';
import { TodoItemComponent } from '../../todo/todo-item/todo-item.component';
import { TodoItemConfig } from '../../todo/todo.model';
import { TodoService } from '../../todo/todo.service';
import { CalendarService } from '../calendar.service';
import { EditCalendarEventComponent } from '../edit-calendar-event/edit-calendar-event.component';
import { CalendarEvent } from '../event.model';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, EditCalendarEventComponent, TodoItemComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  isLoaded = false;

  locale = 'de-DE';
  today: Date = new Date();
  currentWeekStart: Date = this.getFirstDayOfISOWeek(this.today);

  weekStartDate: Date = new Date();
  timeSlotHeight = 80; // Same as h-20 in template

  selectedEvent: CalendarEvent | null = null;
  eventOverlay = false;

  weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  timeSlots = Array.from({ length: 24 }, (_, i) => i); // @todo i18n; default 8AM to 6PM; if there are events earlier or later, increase timespan to one hour before/ after first event/ last event
  timeSlotsStart = 8;
  timeSlotsEnd = 18;

  events: CalendarEvent[] = [];

  calendarService = inject(CalendarService);
  todoService = inject(TodoService);

  todoItemConfig: TodoItemConfig = {
    showCheckbox: false,
    showCreated: false,
  };

  constructor() {
    effect(() => {
      this.calendarService.calendarEventsSignal();
      this.setEventsForWeek();
    });
  }

  getTodosForDay(dayIndex: number): Todo[] {
    const todos = this.todoService.todos();
    if (!todos) return [];

    const dayStart = this.createDateForWeekDay(dayIndex, 0, 0);
    const dayEnd = this.createDateForWeekDay(dayIndex, 23, 59);

    return todos.filter((todo) => {
      if (!todo.due) return false;
      const dueDate = new Date(todo.due);
      return dueDate >= dayStart && dueDate <= dayEnd;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  setTimeSlots() {
    // Initialize with extreme values
    let earliestHour = 23;
    let latestHour = 0;

    // Iterate through all events
    this.events.forEach((event) => {
      // Extract hours from start time
      const startHour = event.start.getHours();

      // Extract hours from end time
      const endHour = event.end.getHours();
      // Also check minutes for end time - if there are minutes, round up to the next hour
      const endMinutes = event.end.getMinutes();
      const adjustedEndHour = endMinutes > 0 ? endHour + 1 : endHour;

      // Update earliest hour if this event starts earlier
      if (startHour < earliestHour) {
        earliestHour = startHour;
      }

      // Update latest hour if this event ends later
      if (adjustedEndHour > latestHour) {
        latestHour = adjustedEndHour;
      }
    });

    // Initialize with extreme values
    const earliestHourDefault = 8;
    const latestHourDefault = 18;

    this.timeSlotsStart = Math.min(earliestHour, earliestHourDefault);
    this.timeSlotsEnd = Math.max(latestHour, latestHourDefault);

    this.timeSlots = Array.from(
      { length: this.timeSlotsEnd - this.timeSlotsStart + 1 },
      (_, index) => this.timeSlotsStart + index
    ); // @todo i18n; default 8AM to 6PM; if there are events earlier or later, increase timespan to one hour before/ after first event/ last event
  }

  calculateEventStyle(startTime: string, endTime: string): { top: string; height: string } {
    const start = Number.parseInt(startTime.split(':')[0]) + Number.parseInt(startTime.split(':')[1]) / 60;
    const end = Number.parseInt(endTime.split(':')[0]) + Number.parseInt(endTime.split(':')[1]) / 60;
    const top = start * 80; // 80px per hour
    const height = (end - start) * 80;
    return { top: `${top}px`, height: `${height}px` };
  }

  createEvent() {
    this.selectedEvent = null;
    this.eventOverlay = true;
  }

  closeOverlay() {
    this.eventOverlay = false;
    this.selectedEvent = null;
  }

  selectEvent(event: CalendarEvent) {
    this.selectedEvent = event;
    this.eventOverlay = true;
  }

  handleEventClick(event: CalendarEvent): void {
    this.selectEvent(event);
  }

  closeEventDetails(): void {
    this.selectedEvent = null;
  }

  selectTodo(todo: Todo): void {
    // Handle todo selection if needed
    console.log('Todo selected:', todo);
  }

  setEventsForWeek() {
    let events = this.calendarService.calendarEventsSignal();
    console.log('setEventsForWeek()', events);
    if (events)
      this.events = this.filterEventsByDateRange(
        events,
        this.currentWeekStart,
        this.getLastDayOfISOWeek(this.currentWeekStart)
      );
    this.setTimeSlots();
  }

  weekDay(days: number): Date {
    const result = new Date(this.currentWeekStart);
    result.setDate(result.getDate() + days);
    return result;
  }

  getFirstDayOfISOWeek(date: Date) {
    // @todo maybe use luxon
    // Clone the date to avoid modifying the original
    const first = new Date(date);
    // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    const day = first.getDay() || 7; // Convert Sunday from 0 to 7
    // If not Monday (1), go back to the first day of the week
    if (day !== 1) {
      first.setDate(first.getDate() - (day - 1));
    }
    // Set time to beginning of the day
    first.setHours(0, 0, 0, 0);
    return first;
  }

  getWeekOfYear(date: Date) {
    const dateTime = DateTime.fromJSDate(date);
    return dateTime.setLocale(this.locale).weekNumber;
  }

  getLastDayOfISOWeek(firstDayOfWeek: Date) {
    const lastDay = new Date(firstDayOfWeek);
    lastDay.setDate(firstDayOfWeek.getDate() + 6);
    return lastDay;
  }

  nextWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.setEventsForWeek();
  }

  previousWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.setEventsForWeek();
  }

  getEventsForDay(dayIndex: number): CalendarEvent[] {
    // Create start and end date for the target day
    const dayStart = this.createDateForWeekDay(dayIndex, 0, 0);
    const dayEnd = this.createDateForWeekDay(dayIndex, 23, 59);

    // Filter events that occur on this day
    return this.events.filter((event) => {
      return event.start >= dayStart && event.start < dayEnd;
    });
  }

  createDateForWeekDay(dayIndex: number, hours: number, minutes: number): Date {
    const date = new Date(this.currentWeekStart);
    date.setDate(date.getDate() + dayIndex);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  // Calculate top position for event based on start time
  calculateEventPosition(startDate: Date): { top: string } {
    const hours = startDate.getHours();
    const minutes = startDate.getMinutes();

    // Calculate offset from 8:00 AM (first time slot)
    const hoursOffset = hours - this.timeSlotsStart;
    const minutesOffset = minutes / 60;

    // Calculate position (each hour is timeSlotHeight pixels)
    const topPosition = (hoursOffset + minutesOffset) * this.timeSlotHeight;

    return { top: `${topPosition}px` };
  }

  // Calculate height for event based on duration
  calculateEventHeight(startDate: Date, endDate: Date): string {
    // Calculate duration in hours
    const durationMs = endDate.getTime() - startDate.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);

    // Calculate height (each hour is timeSlotHeight pixels)
    const height = durationHours * this.timeSlotHeight;

    return `${height}px`;
  }

  isToday(day: Date) {
    return this.isSameDay(day, this.today);
  }

  isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  formatDate(date: Date) {
    //@todo make generic, pass Intl.LocalesArgument
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Berlin', // Optional: specify time zone if needed
    };

    const formatter = new Intl.DateTimeFormat(this.locale, options);

    return formatter.format(date);
  }

  filterEventsByDateRange(events: CalendarEvent[], startDate: Date, endDate: Date): CalendarEvent[] {
    // Normalize dates to start of day for day-based comparison
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    console.log('events', events, 'start', start, 'end', end);
    return events.filter((event) => {
      // Normalize event dates to start of day
      const eventStartDay = new Date(event.start);
      eventStartDay.setHours(0, 0, 0, 0);

      const eventEndDay = new Date(event.end);
      eventEndDay.setHours(23, 59, 59, 999);

      // Event starts before the end date AND ends after the start date
      // This captures any event that overlaps with the date range
      return eventStartDay <= end && eventEndDay >= start;
    });
  }
}
