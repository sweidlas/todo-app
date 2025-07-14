import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CREATE_TODO_MUTATION } from 'src/app/shared/graphql/mutations/create_todo';
import { DELETE_TODO_MUTATION } from 'src/app/shared/graphql/mutations/delete_todo';
import { UPDATE_TODO_MUTATION } from 'src/app/shared/graphql/mutations/update_todo';
import { TODOS_QUERY } from 'src/app/shared/graphql/queries/todos';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { Todo, TodosQuery } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiService = inject(ApiService);
  authService = inject(AuthService);

  constructor() {
    console.log('TodoService constructed');
    effect(() => {
      if (this.authService.loggedIn() == true) {
        this.authService.registerComponent(this);
        this.todosQuery();
      }
      if (this.authService.loggedIn() == false) this.cleanService();
    });

    // Subscribe to loading events
    this.authService.loginLoadingTrigger$.subscribe(() => {
      this.authService.registerComponent(this);
      this.todosQuery();
    });
  }

  cleanService() {
    this.todos.set(undefined);
  }

  todos = signal<Todo[] | undefined>(undefined);

  todosCompleted = computed<Todo[] | undefined>(() => {
    return this.todos()?.filter((todo) => {
      return todo.completed;
    });
  });

  todosNotCompleted = computed<Todo[] | undefined>(() => {
    return this.todos()?.filter((todo) => {
      return !todo.completed;
    });
  });

  refetch() {
    this.apiService.query({ query: TODOS_QUERY }).refetch();

    // TODO: more intelligent refetch depending on create/ update/ delete
  }

  todosQuery() {
    this.apiService.query<TodosQuery>({ query: TODOS_QUERY }).valueChanges.subscribe((result) => {
      console.log('todos result', result.data.todos.length, result);
      const todos = result.data.todos;
      if (todos) this.todos.set(todos);
      this.authService.setComponentReady(this);
    });
  }

  createTodo(variables: Todo) {
    const optimisticResponse = {
      ...variables,
      id: `optimistic-${Date.now()}`,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      due: variables.due || null,
      __typename: 'Todo', // Don't forget this!
    };
    console.log('optimisticResponse', optimisticResponse);

    this.apiService
      .mutate({
        mutation: CREATE_TODO_MUTATION,
        variables: variables,
        optimisticResponse: { createTodo: optimisticResponse },
        update: (cache, { data }) => {
          const existingTodos: any = cache.readQuery({
            query: TODOS_QUERY,
          });
          let data2: any = data;
          cache.writeQuery<TodosQuery>({
            query: TODOS_QUERY,
            data: {
              todos: [...existingTodos.todos, data2.createTodo],
            },
          });
        },
      })
      .subscribe({
        next: (result) => {
          console.log('create todo result', result);
        },
        error: (error) => {
          console.error('Mutation failed', error);
          // The optimistic update will be automatically rolled back
        },
      });
  }

  updateTodo(variables: Todo) {
    const optimisticResponse = {
      ...variables,
      updated: new Date().toISOString(),
      __typename: 'Todo',
    };
    console.log('optimisticResponse', optimisticResponse);

    this.apiService
      .mutate({
        mutation: UPDATE_TODO_MUTATION,
        variables: variables,
        optimisticResponse: { updateTodo: optimisticResponse },
        update: (cache, { data }) => {
          const existingTodos: any = cache.readQuery({
            query: TODOS_QUERY,
          });
          let data2: any = data;
          cache.writeQuery<TodosQuery>({
            query: TODOS_QUERY,
            data: {
              todos: existingTodos.todos.map((todo: Todo) =>
                todo.id === data2.updateTodo.id ? data2.updateTodo : todo
              ),
            },
          });
        },
      })
      .subscribe((result) => {
        console.log('update todo result', result);
      });
  }

  deleteTodo(variables: { id: string }) {
    this.apiService
      .mutate({
        mutation: DELETE_TODO_MUTATION,
        variables: variables,
        optimisticResponse: { deleteTodo: variables },
        update: (cache, { data }) => {
          const existingTodos: any = cache.readQuery({
            query: TODOS_QUERY,
          });
          let data2: any = data;
          console.log('data2', data2);
          cache.writeQuery<TodosQuery>({
            query: TODOS_QUERY,
            data: {
              todos: existingTodos.todos.filter((todo: Todo) => todo.id !== data2.deleteTodo),
            },
          });
        },
      })
      .subscribe((result) => {
        console.log('delete todo result', result);
      });
  }
}
