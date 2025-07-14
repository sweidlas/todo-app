import { gql } from 'apollo-angular';

export const CREATE_CALENDAR_EVENT_MUTATION = gql`
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
