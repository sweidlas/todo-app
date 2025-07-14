import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Todo } from 'src/generated/graphql';
import { TimeAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';
import { TodoItemConfig } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Input() config: TodoItemConfig = { showCheckbox: true, showCreated: true };
  @Input() locale: string = 'de-DE';
  @Output() itemClick = new EventEmitter<Todo>();

  todoService = inject(TodoService);

  onItemClick() {
    this.itemClick.emit(this.todo);
  }

  onCheckboxChange(event: Event) {
    event.stopPropagation();
    const checkbox = event.target as HTMLInputElement;
    const updatedTodo = { ...this.todo, completed: checkbox.checked };
    this.todoService.updateTodo(updatedTodo);
  }
}
