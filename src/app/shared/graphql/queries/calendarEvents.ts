import { gql } from 'apollo-angular';

export const CALENDAR_EVENTS_QUERY = gql`
  query calendarEvents {
    calendarEvents {
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
