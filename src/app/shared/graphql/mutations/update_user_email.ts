import { gql } from 'apollo-angular';

export const UPDATE_USER_EMAIL_MUTATION = gql`
  mutation updateUserEmail($email: String!) {
    updateUserEmail(input: { email: $email }) {
      createdAt
      email
      id
      username
    }
  }
`;
