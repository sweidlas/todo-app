import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { OverlayComponent } from 'src/app/shared/components/overlay/overlay.component';
import { CalendarService } from '../calendar.service';
import { CalendarEvent } from '../event.model';

@Component({
  selector: 'app-edit-calendar-event',
  imports: [CommonModule, ReactiveFormsModule, OverlayComponent],
  templateUrl: './edit-calendar-event.component.html',
  styleUrl: './edit-calendar-event.component.scss',
})
export class EditCalendarEventComponent implements OnChanges {
  @Input() show = false;
  @Input() selectedEvent?: CalendarEvent;
  @Output() emitCloseOverlay = new EventEmitter<void>();

  deleteConfirmOverlay = false;

  calendarService = inject(CalendarService);
  fb = inject(FormBuilder);

  eventForm!: FormGroup;

  colorOptions = [
    { value: 'bg-yellow-400', label: 'Yellow', class: 'bg-yellow-400' },
    { value: 'bg-orange-400', label: 'Orange', class: 'bg-orange-400' },
    { value: 'bg-red-400', label: 'Red', class: 'bg-red-400' },
    { value: 'bg-green-400', label: 'Green', class: 'bg-green-400' },
    { value: 'bg-pink-400', label: 'Pink', class: 'bg-pink-400' },
    { value: 'bg-blue-400', label: 'Blue', class: 'bg-blue-400' },
    { value: 'bg-purple-400', label: 'Purple', class: 'bg-purple-400' },
    { value: 'bg-indigo-400', label: 'Indigo', class: 'bg-indigo-400' },
    { value: 'bg-teal-400', label: 'Teal', class: 'bg-teal-400' },
    { value: 'bg-cyan-400', label: 'Cyan', class: 'bg-cyan-400' },
  ];

  constructor() {
    this.setupEventForm();
  }

  ngOnChanges() {
    if (this.selectedEvent && this.eventForm) {
      const updatedEvent = this.dateToDateTimeLocal(this.selectedEvent);
      this.eventForm.patchValue(updatedEvent);
    } else if (this.show && this.eventForm) {
      this.eventForm.reset();
      // Set default times (current time for start, 1 hour later for end)
      const now = DateTime.now();
      const startTime = now.toFormat("yyyy-MM-dd'T'HH:mm");
      const endTime = now.plus({ hours: 1 }).toFormat("yyyy-MM-dd'T'HH:mm");

      this.eventForm.patchValue({
        start: startTime,
        end: endTime,
      });
    }
  }

  setupEventForm() {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      location: ['', [Validators.maxLength(200)]],
      start: ['', Validators.required],
      end: ['', Validators.required],
      color: [null, Validators.required],
    });

    this.eventForm.get('start')?.valueChanges.subscribe((startValue) => {
      if (startValue) {
        const startDate = new Date(startValue);
        const endValue = this.eventForm.get('end')?.value;

        if (endValue) {
          const endDate = new Date(endValue);

          if (startDate >= endDate) {
            const newEndDate = DateTime.fromJSDate(startDate).plus({ hours: 1 });
            this.eventForm.get('end')?.setValue(newEndDate.toFormat("yyyy-MM-dd'T'HH:mm"));
          }
        }
      }
    });
  }

  closeOverlay() {
    this.eventForm.reset();
    this.emitCloseOverlay.emit();
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      let event: CalendarEvent = this.eventForm.value;
      if (!this.selectedEvent) {
        event = this.dateTimeLocalToDate(event);
        this.calendarService.createCalendarEvent(event);
      } else {
        let patchedEvent = { ...this.selectedEvent, ...event };
        patchedEvent = this.dateTimeLocalToDate(patchedEvent);
        this.calendarService.updateCalendarEvent(patchedEvent);
      }
      this.closeOverlay();
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    if (!this.eventForm) return;
    Object.keys(this.eventForm.controls).forEach((key) => {
      const control = this.eventForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.eventForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.eventForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength'])
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['maxlength'])
        return `${fieldName} must not exceed ${field.errors['maxlength'].requiredLength} characters`;
      if (field.errors['min']) return `${fieldName} must be at least ${field.errors['min'].min}`;
    }
    return '';
  }

  dateTimeLocalToDate(event: CalendarEvent): CalendarEvent {
    if (event.start) {
      event.start = new Date(event.start);
    }
    if (event.end) {
      event.end = new Date(event.end);
    }
    return event;
  }

  dateToDateTimeLocal(event: CalendarEvent): any {
    const updatedEvent: any = { ...event };
    if (event.start) {
      updatedEvent.start = DateTime.fromJSDate(event.start).toFormat("yyyy-MM-dd'T'HH:mm");
    }
    if (event.end) {
      updatedEvent.end = DateTime.fromJSDate(event.end).toFormat("yyyy-MM-dd'T'HH:mm");
    }
    return updatedEvent;
  }

  openDeleteConfirmOverlay() {
    this.deleteConfirmOverlay = true;
  }

  closeDeleteConfirmOverlay() {
    this.deleteConfirmOverlay = false;
  }

  deleteEvent() {
    if (this.selectedEvent) this.calendarService.deleteCalendarEvent({ id: this.selectedEvent.id });
    this.deleteConfirmOverlay = false;
    this.closeOverlay();
  }
}
