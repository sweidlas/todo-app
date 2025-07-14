import { gql } from 'apollo-angular';

export const TODOS_BY_COMPLETED_QUERY = gql`
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
