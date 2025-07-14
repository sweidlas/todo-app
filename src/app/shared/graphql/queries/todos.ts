import { gql } from 'apollo-angular';

export const TODOS_QUERY = gql`
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
