import React from 'react';
import client from './src/utils/client';
import userFromStorage from './src/utils/user-from-storage';
import {ApolloProvider} from 'react-apollo';

client.writeData({
  data: {
    user: userFromStorage()
  }
});

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({element}) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
