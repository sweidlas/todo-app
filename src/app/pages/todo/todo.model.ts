import { Todo } from 'src/generated/graphql';

export interface TodoList {
  // @todo implement in graphql server
  id: number;
  name: string;
  todos: Todo[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface TodoItemConfig {
  showCheckbox: boolean;
  showCreated: boolean;
}
