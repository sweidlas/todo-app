import { gql } from 'apollo-angular';

export const DELETE_CALENDAR_EVENT_MUTATION = gql`
  mutation deleteCalendarEvent($id: ID!) {
    deleteCalendarEvent(id: $id)
  }
`;
