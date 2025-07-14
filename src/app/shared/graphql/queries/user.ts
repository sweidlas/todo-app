import { gql } from 'apollo-angular';

export const USER_QUERY = gql`
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
