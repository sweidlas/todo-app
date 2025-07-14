import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type CalendarEvent = {
  __typename?: 'CalendarEvent';
  color?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  start: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateCalendarEventInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end: Scalars['DateTime']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  start: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type CreateTodoInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  due?: InputMaybe<Scalars['DateTime']['input']>;
  priority?: InputMaybe<Priority>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCalendarEvent: CalendarEvent;
  createTodo: Todo;
  deleteCalendarEvent: Scalars['ID']['output'];
  deleteTodo: Scalars['ID']['output'];
  updateCalendarEvent: CalendarEvent;
  updateTodo: Todo;
  updateUserEmail?: Maybe<User>;
  updateUserPassword?: Maybe<User>;
};

export type MutationCreateCalendarEventArgs = {
  input: CreateCalendarEventInput;
};

export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};

export type MutationDeleteCalendarEventArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateCalendarEventArgs = {
  input: UpdateCalendarEventInput;
};

export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};

export type MutationUpdateUserEmailArgs = {
  input: UpdateUserEmailInput;
};

export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput;
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
}

export type Query = {
  __typename?: 'Query';
  calendarEventById?: Maybe<CalendarEvent>;
  calendarEvents: Array<CalendarEvent>;
  todoById?: Maybe<Todo>;
  todos: Array<Todo>;
  todosByCompleted: Array<Todo>;
  user?: Maybe<User>;
  userSettings?: Maybe<UserSettings>;
};

export type QueryCalendarEventByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTodoByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTodosByCompletedArgs = {
  completed: Scalars['Boolean']['input'];
};

export type Todo = {
  __typename?: 'Todo';
  color?: Maybe<Scalars['String']['output']>;
  completed: Scalars['Boolean']['output'];
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  due?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  priority?: Maybe<Priority>;
  title: Scalars['String']['output'];
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateCalendarEventInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTodoInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  due?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  priority?: InputMaybe<Priority>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserEmailInput = {
  email: Scalars['String']['input'];
};

export type UpdateUserPasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  userSettings?: Maybe<UserSettings>;
  username: Scalars['String']['output'];
};

export type UserSettings = {
  __typename?: 'UserSettings';
  id: Scalars['ID']['output'];
  showAnimations: Scalars['Boolean']['output'];
  userId: Scalars['String']['output'];
};

export type CreateCalendarEventMutationVariables = Exact<{
  title: Scalars['String']['input'];
  start: Scalars['DateTime']['input'];
  end: Scalars['DateTime']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateCalendarEventMutation = {
  __typename?: 'Mutation';
  createCalendarEvent: {
    __typename?: 'CalendarEvent';
    id: string;
    title: string;
    start: any;
    end: any;
    color?: string | null;
    description?: string | null;
    location?: string | null;
    created?: any | null;
    updated?: any | null;
  };
};

export type CreateTodoMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Priority>;
  due?: InputMaybe<Scalars['DateTime']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateTodoMutation = {
  __typename?: 'Mutation';
  createTodo: {
    __typename?: 'Todo';
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    priority?: Priority | null;
    due?: any | null;
    color?: string | null;
    created?: any | null;
    updated?: any | null;
  };
};

export type DeleteCalendarEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteCalendarEventMutation = { __typename?: 'Mutation'; deleteTodo: string };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteTodoMutation = { __typename?: 'Mutation'; deleteTodo: string };

export type UpdateCalendarEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  start: Scalars['DateTime']['input'];
  end: Scalars['DateTime']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateCalendarEventMutation = {
  __typename?: 'Mutation';
  updateCalendarEvent: {
    __typename?: 'CalendarEvent';
    id: string;
    title: string;
    start: any;
    end: any;
    color?: string | null;
    description?: string | null;
    location?: string | null;
    created?: any | null;
    updated?: any | null;
  };
};

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Priority>;
  due?: InputMaybe<Scalars['DateTime']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateTodoMutation = {
  __typename?: 'Mutation';
  updateTodo: {
    __typename?: 'Todo';
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    priority?: Priority | null;
    due?: any | null;
    color?: string | null;
    created?: any | null;
    updated?: any | null;
  };
};

export type UpdateUserEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type UpdateUserEmailMutation = {
  __typename?: 'Mutation';
  updateUserEmail?: { __typename?: 'User'; createdAt: string; email: string; id: string; username: string } | null;
};

export type UpdateUserPasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;

export type UpdateUserPasswordMutation = {
  __typename?: 'Mutation';
  updateUserPassword?: { __typename?: 'User'; createdAt: string; email: string; id: string; username: string } | null;
};

export type CalendarEventsQueryVariables = Exact<{ [key: string]: never }>;

export type CalendarEventsQuery = {
  __typename?: 'Query';
  calendarEvents: Array<{
    __typename?: 'CalendarEvent';
    id: string;
    title: string;
    start: any;
    end: any;
    color?: string | null;
    description?: string | null;
    location?: string | null;
    created?: any | null;
    updated?: any | null;
  }>;
};

export type TodosQueryVariables = Exact<{ [key: string]: never }>;

export type TodosQuery = {
  __typename?: 'Query';
  todos: Array<{
    __typename?: 'Todo';
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    priority?: Priority | null;
    due?: any | null;
    color?: string | null;
    created?: any | null;
    updated?: any | null;
  }>;
};

export type TodosByCompletedQueryVariables = Exact<{
  completed: Scalars['Boolean']['input'];
}>;

export type TodosByCompletedQuery = {
  __typename?: 'Query';
  todosByCompleted: Array<{
    __typename?: 'Todo';
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    priority?: Priority | null;
    due?: any | null;
    color?: string | null;
    created?: any | null;
    updated?: any | null;
  }>;
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    createdAt: string;
    email: string;
    id: string;
    username: string;
    userSettings?: { __typename?: 'UserSettings'; userId: string; id: string; showAnimations: boolean } | null;
  } | null;
};

export const CreateCalendarEventDocument = gql`
  mutation createCalendarEvent(
    $title: String!
    $start: DateTime!
    $end: DateTime!
    $color: String
    $description: String
    $location: String
  ) {
    createCalendarEvent(
      input: { title: $title, description: $description, color: $color, start: $start, end: $end, location: $location }
    ) {
      id
      title
      start
      end
      color
      description
      location
      created
      updated
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateCalendarEventGQL extends Apollo.Mutation<
  CreateCalendarEventMutation,
  CreateCalendarEventMutationVariables
> {
  override document = CreateCalendarEventDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateTodoDocument = gql`
  mutation createTodo(
    $title: String!
    $description: String
    $completed: Boolean
    $priority: Priority
    $due: DateTime
    $color: String
  ) {
    createTodo(
      input: {
        title: $title
        description: $description
        completed: $completed
        priority: $priority
        due: $due
        color: $color
      }
    ) {
      id
      title
      description
      completed
      priority
      due
      color
      created
      updated
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateTodoGQL extends Apollo.Mutation<CreateTodoMutation, CreateTodoMutationVariables> {
  override document = CreateTodoDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteCalendarEventDocument = gql`
  mutation deleteCalendarEvent($id: ID!) {
    deleteTodo(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteCalendarEventGQL extends Apollo.Mutation<
  DeleteCalendarEventMutation,
  DeleteCalendarEventMutationVariables
> {
  override document = DeleteCalendarEventDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteTodoDocument = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteTodoGQL extends Apollo.Mutation<DeleteTodoMutation, DeleteTodoMutationVariables> {
  override document = DeleteTodoDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateCalendarEventDocument = gql`
  mutation updateCalendarEvent(
    $id: ID!
    $title: String!
    $start: DateTime!
    $end: DateTime!
    $color: String
    $description: String
    $location: String
  ) {
    updateCalendarEvent(
      input: {
        id: $id
        title: $title
        description: $description
        color: $color
        start: $start
        end: $end
        location: $location
      }
    ) {
      id
      title
      start
      end
      color
      description
      location
      created
      updated
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateCalendarEventGQL extends Apollo.Mutation<
  UpdateCalendarEventMutation,
  UpdateCalendarEventMutationVariables
> {
  override document = UpdateCalendarEventDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateTodoDocument = gql`
  mutation updateTodo(
    $id: ID!
    $title: String!
    $description: String
    $completed: Boolean
    $priority: Priority
    $due: DateTime
    $color: String
  ) {
    updateTodo(
      input: {
        id: $id
        title: $title
        description: $description
        completed: $completed
        priority: $priority
        due: $due
        color: $color
      }
    ) {
      id
      title
      description
      completed
      priority
      due
      color
      created
      updated
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateTodoGQL extends Apollo.Mutation<UpdateTodoMutation, UpdateTodoMutationVariables> {
  override document = UpdateTodoDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateUserEmailDocument = gql`
  mutation updateUserEmail($email: String!) {
    updateUserEmail(input: { email: $email }) {
      createdAt
      email
      id
      username
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateUserEmailGQL extends Apollo.Mutation<UpdateUserEmailMutation, UpdateUserEmailMutationVariables> {
  override document = UpdateUserEmailDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateUserPasswordDocument = gql`
  mutation updateUserPassword($oldPassword: String!, $newPassword: String!) {
    updateUserPassword(input: { oldPassword: $oldPassword, newPassword: $newPassword }) {
      createdAt
      email
      id
      username
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateUserPasswordGQL extends Apollo.Mutation<
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables
> {
  override document = UpdateUserPasswordDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CalendarEventsDocument = gql`
  query calendarEvents {
    calendarEvents {
      id
      title
      start
      end
      color
      description
      location
      created
      updated
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsGQL extends Apollo.Query<CalendarEventsQuery, CalendarEventsQueryVariables> {
  override document = CalendarEventsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TodosDocument = gql`
  query Todos {
    todos {
      id
      title
      description
      completed
      priority
      due
      color
      created
      updated
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class TodosGQL extends Apollo.Query<TodosQuery, TodosQueryVariables> {
  override document = TodosDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TodosByCompletedDocument = gql`
  query TodosByCompleted($completed: Boolean!) {
    todosByCompleted(completed: $completed) {
      id
      title
      description
      completed
      priority
      due
      color
      created
      updated
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class TodosByCompletedGQL extends Apollo.Query<TodosByCompletedQuery, TodosByCompletedQueryVariables> {
  override document = TodosByCompletedDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UserDocument = gql`
  query User {
    user {
      createdAt
      email
      id
      username
      userSettings {
        userId
        id
        showAnimations
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
  override document = UserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
