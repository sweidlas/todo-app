import { gql } from 'apollo-angular';

export const CREATE_TODO_MUTATION = gql`
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
