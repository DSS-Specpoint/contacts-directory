import { gql } from '@apollo/client';

export const SEARCH_CONTACTS = gql`
  query SearchContacts($searchTerm: String!) {
    searchContacts(searchTerm: $searchTerm) {
      id
      firstName
      lastName
      phoneNumber
      email
    }
  }
`;