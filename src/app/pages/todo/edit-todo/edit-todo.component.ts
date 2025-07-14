import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { OverlayComponent } from 'src/app/shared/components/overlay/overlay.component';
import { Priority, Todo } from 'src/generated/graphql';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-edit-todo',
  imports: [CommonModule, ReactiveFormsModule, OverlayComponent],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent implements OnChanges {
  @Input() show = false;
  @Input() selectedTodo?: Todo;
  @Output() emitClose = new EventEmitter<void>();

  deleteConfirmOverlay = false;

  priorities = Object.values(Priority);
  todoService = inject(TodoService);
  fb = inject(FormBuilder);

  todoForm!: FormGroup;

  colorOptions = [
    { value: 'bg-white', label: 'White', class: 'bg-white' },
    { value: 'bg-yellow-400', label: 'Yellow', class: 'bg-yellow-400' },
    { value: 'bg-orange-400', label: 'Orange', class: 'bg-orange-400' },
    { value: 'bg-red-400', label: 'Red', class: 'bg-red-400' },
    { value: 'bg-green-400', label: 'Green', class: 'bg-green-400' },
    { value: 'bg-pink-400', label: 'Pink', class: 'bg-pink-400' },
    { value: 'bg-blue-400', label: 'Blue', class: 'bg-blue-400' },
  ];

  constructor() {
    this.setupTodoForm();
  }

  ngOnChanges() {
    if (this.selectedTodo && this.todoForm) {
      const updatedTodo = this.dueDateIsoStringTodateTimeLocal(this.selectedTodo);
      this.todoForm.patchValue(updatedTodo);
    } else if (this.show && this.todoForm) {
      this.todoForm.reset();
      this.todoForm.patchValue({
        priority: Priority.Medium,
        completed: false,
        color: this.colorOptions[0].value,
      });
    }
  }

  setupTodoForm() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      completed: [false],
      priority: [Priority.Medium, Validators.required],
      due: [null],
      color: [null, Validators.required],
    });
  }

  closeOverlay() {
    this.todoForm.reset();
    this.emitClose.emit();
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      let todo: Todo = this.todoForm.value;
      if (!this.selectedTodo) {
        todo = this.dateTimeLocalToIsoString(todo);
        this.todoService.createTodo(todo);
      } else {
        let patchedTodo = { ...this.selectedTodo, ...todo };
        patchedTodo = this.dateTimeLocalToIsoString(patchedTodo);
        this.todoService.updateTodo(patchedTodo);
      }
      this.closeOverlay();
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    if (!this.todoForm) return;
    Object.keys(this.todoForm.controls).forEach((key) => {
      const control = this.todoForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.todoForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.todoForm.get(fieldName);
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

  dateTimeLocalToIsoString(todo: Todo): Todo {
    if (todo.due) {
      const dueInIso = new Date(todo.due!).toISOString();
      console.log('dueInIso', dueInIso);
      todo.due = dueInIso;
    }
    return todo;
  }

  dueDateIsoStringTodateTimeLocal(todo: Todo): Todo {
    console.log('item', todo);
    if (todo.due) {
      const luxonDate = DateTime.fromISO(todo.due).toFormat("yyyy-MM-dd'T'HH:mm");
      console.log('luxonDate', luxonDate);
      const updatedTodo = { ...todo };
      updatedTodo.due = luxonDate;
      return updatedTodo;
    } else {
      return todo;
    }
  }

  openDeleteConfirmOverlay() {
    this.deleteConfirmOverlay = true;
  }

  closeDeleteConfirmOverlay() {
    this.deleteConfirmOverlay = false;
  }

  deleteTodo() {
    if (this.selectedTodo) this.todoService.deleteTodo({ id: this.selectedTodo.id });
    this.deleteConfirmOverlay = false;
    this.closeOverlay();
  }
}
