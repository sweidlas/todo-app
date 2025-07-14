import { gql } from 'apollo-angular';

export const UPDATE_TODO_MUTATION = gql`
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
