import { gql } from 'apollo-angular';

export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation updateUserPassword($oldPassword: String!, $newPassword: String!) {
    updateUserPassword(input: { oldPassword: $oldPassword, newPassword: $newPassword }) {
      createdAt
      email
      id
      username
    }
  }
`;
