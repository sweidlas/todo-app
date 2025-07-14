import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from 'src/generated/graphql';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoItemConfig } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, EditTodoComponent, FormsModule, TodoItemComponent],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  locale = 'de-DE';

  todoService = inject(TodoService);

  @ViewChild('scrollContainer', { static: false }) scrollContainer?: ElementRef<HTMLElement>;

  selectedTodo?: Todo;
  todoOverlay = false;
  showCompleted = signal(false);
  sortOption = signal<
    | 'created-asc'
    | 'created-desc'
    | 'updated-asc'
    | 'updated-desc'
    | 'priority-asc'
    | 'priority-desc'
    | 'due-asc'
    | 'due-desc'
  >('created-desc');

  currentPage = signal(1);
  itemsPerPage = 50;

  sortOptions = [
    { value: 'created-desc', label: 'Created (Newest)' },
    { value: 'created-asc', label: 'Created (Oldest)' },
    { value: 'updated-desc', label: 'Updated (Newest)' },
    { value: 'updated-asc', label: 'Updated (Oldest)' },
    { value: 'priority-desc', label: 'Priority (High to Low)' },
    { value: 'priority-asc', label: 'Priority (Low to High)' },
    { value: 'due-desc', label: 'Due Date (Latest)' },
    { value: 'due-asc', label: 'Due Date (Earliest)' },
  ] as const;

  todoItemConfig: TodoItemConfig = {
    showCheckbox: true,
    showCreated: true,
  };

  currentTodos = computed(() => {
    console.log('this.todoService.todosCompleted()', this.todoService.todosCompleted());
    let todos = this.showCompleted() ? this.todoService.todosCompleted() : this.todoService.todosNotCompleted();

    if (!todos) return todos;

    const sortOption = this.sortOption();

    // Filter out todos without due dates when sorting by due date
    if (sortOption.startsWith('due-')) {
      todos = todos.filter((todo) => todo.due);
    }

    // Sort todos based on selected option
    const sortedTodos = [...todos].sort((a, b) => {
      let comparison = 0;

      switch (sortOption) {
        case 'created-desc':
          comparison = new Date(b.created || 0).getTime() - new Date(a.created || 0).getTime();
          break;
        case 'created-asc':
          comparison = new Date(a.created || 0).getTime() - new Date(b.created || 0).getTime();
          break;
        case 'updated-desc':
          comparison = new Date(b.updated || 0).getTime() - new Date(a.updated || 0).getTime();
          break;
        case 'updated-asc':
          comparison = new Date(a.updated || 0).getTime() - new Date(b.updated || 0).getTime();
          break;
        case 'priority-desc':
          // HIGH = 3, MEDIUM = 2, LOW = 1 (assuming enum values)
          const getPriorityValue = (priority: any) => {
            if (!priority) return 0;
            switch (priority) {
              case 'HIGH':
                return 3;
              case 'MEDIUM':
                return 2;
              case 'LOW':
                return 1;
              default:
                return 0;
            }
          };
          comparison = getPriorityValue(b.priority) - getPriorityValue(a.priority);
          break;
        case 'priority-asc':
          const getPriorityValueAsc = (priority: any) => {
            if (!priority) return 0;
            switch (priority) {
              case 'HIGH':
                return 3;
              case 'MEDIUM':
                return 2;
              case 'LOW':
                return 1;
              default:
                return 0;
            }
          };
          comparison = getPriorityValueAsc(a.priority) - getPriorityValueAsc(b.priority);
          break;
        case 'due-desc':
          comparison = new Date(b.due || 0).getTime() - new Date(a.due || 0).getTime();
          break;
        case 'due-asc':
          comparison = new Date(a.due || 0).getTime() - new Date(b.due || 0).getTime();
          break;
      }

      return comparison;
    });

    return sortedTodos;
  });

  paginatedTodos = computed(() => {
    const todos = this.currentTodos() ?? [];
    const itemsToShow = this.currentPage() * this.itemsPerPage;
    return todos.slice(0, itemsToShow);
  });

  constructor() {
    console.log('todo component todos query');

    // Reset pagination and scroll when showCompleted or sorting changes
    effect(() => {
      this.showCompleted(); // Read the signal to create dependency
      this.sortOption(); // Read the signal to create dependency
      this.currentPage.set(1); // Reset to first page

      // Reset scroll to top
      if (this.scrollContainer?.nativeElement) {
        this.scrollContainer.nativeElement.scrollTop = 0;
      }
    });
  }

  createTodo() {
    this.selectedTodo = undefined;
    this.todoOverlay = true;
  }

  closeOverlay() {
    this.todoOverlay = false;
    this.selectedTodo = undefined;
  }

  selectTodo(todo: Todo) {
    this.selectedTodo = todo;
    this.todoOverlay = true;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    // Check if scrolled to bottom (with a small tolerance)
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      this.loadMoreItems();
    }
  }

  loadMoreItems() {
    const totalItems = this.currentTodos()?.length ?? 0;
    const currentlyShowing = this.currentPage() * this.itemsPerPage;

    // Only load more if there are more items to show
    if (currentlyShowing < totalItems) {
      this.currentPage.update((page) => page + 1);
    }
  }

  onSortChange(sortOption: string) {
    this.sortOption.set(sortOption as any);
  }
}
