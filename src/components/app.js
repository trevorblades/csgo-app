import CheckoutButton from './checkout-button';
import Footer from './footer';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import PlayerCard from './player-card';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Region from './region';
import styled from '@emotion/styled';
import {TEAM_SIZE, TOTAL_BUDGET} from '../utils/constants';
import {cover} from 'polished';
import {withTheme} from '@material-ui/core/styles';

const Container = styled.div(cover(), {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto'
});

const gridSpacing = 40;
const halfGridSpacing = gridSpacing / 2;
const GridWrapper = styled.div({
  padding: gridSpacing
});

const Regions = withTheme()(
  styled.header(({theme}) => {
    const {minHeight, ...toolbar} = theme.mixins.toolbar;
    const styles = Object.keys(toolbar).reduce((acc, key) => {
      const {minHeight} = toolbar[key];
      return {
        ...acc,
        [key]: {
          top: minHeight
        }
      };
    }, {});

    return {
      display: 'flex',
      flexShrink: 0,
      margin: `${halfGridSpacing}px 0 ${-halfGridSpacing}px`,
      padding: `${halfGridSpacing}px ${gridSpacing}px`,
      position: 'sticky',
      backgroundColor: theme.palette.background.default,
      top: minHeight,
      zIndex: 1,
      ...styles
    };
  })
);

export default class App extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    continents: PropTypes.array.isRequired
  };

  state = {
    budget: TOTAL_BUDGET,
    region: null,
    selectedPlayers: []
  };

  onRegionClick = region => {
    this.setState({region});
  };

  onPlayerCardClick = (player, cost) => {
    this.setState(prevState => {
      const isSelected = prevState.selectedPlayers.includes(player);
      return {
        budget: prevState.budget + cost * (isSelected ? 1 : -1),
        selectedPlayers: isSelected
          ? prevState.selectedPlayers.filter(
              selectedPlayer => selectedPlayer !== player
            )
          : [...prevState.selectedPlayers, player]
      };
    });
  };

  isPlayerSelected = player => this.getSelectedIndex(player) > -1;

  getSelectedIndex(player) {
    return this.state.selectedPlayers.indexOf(player.id);
  }

  render() {
    const isTeamFull = this.state.selectedPlayers.length >= TEAM_SIZE;
    const selectedPlayers = this.props.players
      .filter(this.isPlayerSelected)
      .sort((a, b) => this.getSelectedIndex(a) - this.getSelectedIndex(b));
    return (
      <Container>
        <Header>
          <CheckoutButton players={selectedPlayers} />
        </Header>
        <Regions>
          <Region
            selected={!this.state.region}
            value={null}
            onClick={this.onRegionClick}
          >
            All players
          </Region>
          {this.props.continents.map(continent => (
            <Region
              key={continent.code}
              selected={this.state.region === continent.code}
              value={continent.code}
              onClick={this.onRegionClick}
            >
              {continent.name}
            </Region>
          ))}
        </Regions>
        <GridWrapper>
          <Grid container spacing={gridSpacing}>
            {this.props.players
              .filter(player =>
                this.state.region ? this.state.region === player.region : true
              )
              .map(player => {
                const isSelected = this.isPlayerSelected(player);
                return (
                  <Grid
                    item
                    key={player.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                  >
                    <PlayerCard
                      disabled={
                        !isSelected &&
                        (isTeamFull || this.state.budget < player.cost)
                      }
                      player={player}
                      onClick={this.onPlayerCardClick}
                      selected={isSelected}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </GridWrapper>
        <Footer
          budget={this.state.budget}
          onPlayerCardClick={this.onPlayerCardClick}
          players={selectedPlayers}
        />
      </Container>
    );
  }
}
