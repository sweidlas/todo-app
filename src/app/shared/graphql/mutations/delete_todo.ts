import { gql } from 'apollo-angular';

export const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
