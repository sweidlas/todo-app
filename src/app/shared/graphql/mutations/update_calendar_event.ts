import { gql } from 'apollo-angular';

export const UPDATE_CALENDAR_EVENT_MUTATION = gql`
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
