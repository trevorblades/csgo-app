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
    primary
    createdAt
    selections {
      id
      createdAt
      deletedAt
      player {
        id
        ign
        name
        image
        team {
          name
          logo
        }
        statistics {
          percentile
          week
          year
        }
      }
    }
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
  query GetQuery($id: ID!) {
    entry(id: $id) {
      ...EntryFragment
    }
  }
  ${EntryFragment}
`;

export const UPDATE_ENTRY = gql`
  mutation UpdateEntry($id: ID!, $playerIds: [String]!) {
    updateEntry(id: $id, playerIds: $playerIds) {
      ...EntryFragment
    }
  }
  ${EntryFragment}
`;
