import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    user @client {
      id
      username
      displayName
      profileImage
    }
  }
`;

export const EntryFragment = gql`
  fragment EntryFragment on Entry {
    id
    name
    initialRating
    currentRating
    createdAt
  }
`;

export const CREATE_ENTRY = gql`
  mutation CreateEntry($name: String!, $playerIds: [String]!) {
    createEntry(name: $name, playerIds: $playerIds) {
      ...EntryFragment
    }
  }
  ${EntryFragment}
`;

export const LIST_ENTRIES = gql`
  {
    entries {
      ...EntryFragment
    }
  }
  ${EntryFragment}
`;

export const GET_ENTRY = gql`
  {
    entry {
      ...EntryFragment
      players {
        id
        ign
        name
        rating
        image
        team {
          name
          logo
        }
      }
    }
  }
`;
