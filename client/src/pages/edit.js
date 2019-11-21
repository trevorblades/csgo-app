import AuthRequired from '../components/auth-required';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import LoadingIndicator from '../components/loading-indicator';
import NoIndex from '../components/no-index';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import SaveButton from '../components/save-button';
import TeamBuilder from '../components/team-builder';
import getEntryFinancials, {
  getEntryPlayers
} from '../utils/get-entry-financials';
import styled from '@emotion/styled';
import {GET_ENTRY, UPDATE_ENTRY} from '../utils/queries';
import {Mutation, Query} from '@apollo/react-components';
import {NoSsr, Typography} from '@material-ui/core';
import {Section} from '../components/common';
import {TEAM_SIZE} from '../utils/constants';
import {navigate} from 'gatsby';
import {parse} from 'query-string';

const StyledLoadingIndicator = styled(LoadingIndicator)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
});

export default function Edit(props) {
  // we don't need to make sure this is truthy because...
  // we're redirecting /edit to /create in static/_redirects
  const {id} = parse(props.location.search);
  return (
    <Layout>
      <NoIndex />
      <NoSsr>
        <AuthRequired>
          {id ? (
            <Query query={GET_ENTRY} variables={{id}}>
              {({data, loading, error}) => {
                if (loading) {
                  return <StyledLoadingIndicator />;
                }

                if (error) {
                  return (
                    <Section>
                      <Typography variant="h2" gutterBottom>
                        Error
                      </Typography>
                      <Typography>{error.message}</Typography>
                    </Section>
                  );
                }

                const {currentValue, currentCash} = getEntryFinancials(
                  data.entry
                );
                const players = getEntryPlayers(data.entry);
                return (
                  <Fragment>
                    <Helmet>
                      <title>{data.entry.name}</title>
                    </Helmet>
                    <TeamBuilder
                      amountSpent={currentValue}
                      selectedPlayers={players.map(player => player.id)}
                      budget={currentValue + currentCash}
                    >
                      {players => (
                        <Mutation
                          mutation={UPDATE_ENTRY}
                          variables={{
                            id: data.entry.id,
                            playerIds: players.map(player => player.id)
                          }}
                          onCompleted={data =>
                            navigate(`/teams/${data.updateEntry.id}`)
                          }
                        >
                          {(updateEntry, {loading}) => (
                            <SaveButton
                              onClick={updateEntry}
                              disabled={loading || players.length < TEAM_SIZE}
                            />
                          )}
                        </Mutation>
                      )}
                    </TeamBuilder>
                  </Fragment>
                );
              }}
            </Query>
          ) : (
            <Typography>No id parameter given</Typography>
          )}
        </AuthRequired>
      </NoSsr>
    </Layout>
  );
}

Edit.propTypes = {
  location: PropTypes.object.isRequired
};