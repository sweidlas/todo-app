import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarEvent } from 'src/generated/graphql';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent {
  @Input() event!: CalendarEvent;
  @Input() weekDays: string[] = [];
  @Input() weekDates: number[] = [];
  @Input() currentMonth = '';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
