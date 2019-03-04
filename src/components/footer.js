import Finance from './finance';
import Paper from '@material-ui/core/Paper';
import PlayerCard, {CARD_ASPECT_RATIO} from './player-card';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from '@emotion/styled';
import theme from '@trevorblades/mui-theme';
import {TEAM_SIZE, TOTAL_BUDGET} from '../util';

const Container = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  flexShrink: 0,
  marginTop: 'auto',
  padding: theme.spacing.unit * 2,
  position: 'sticky',
  bottom: 0
});

const Players = styled.div({
  display: 'flex'
});

const playerWidth = 90;
const emptyPlayers = Array(TEAM_SIZE).fill(null);
const Player = styled.div({
  width: playerWidth,
  height: playerWidth / CARD_ASPECT_RATIO,
  borderRadius: theme.shape.borderRadius,
  boxShadow: `inset 0 0 0 1px ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.background.default,
  ':not(:last-child)': {
    marginRight: theme.spacing.unit * 1.5
  }
});

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevBudget: props.budget
    };
  }

  static propTypes = {
    budget: PropTypes.number.isRequired,
    players: PropTypes.array.isRequired,
    onPlayerCardClick: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    if (prevProps.budget !== this.props.budget) {
      this.setState({
        prevBudget: prevProps.budget
      });
    }
  }

  render() {
    return (
      <Container component="footer" square elevation={10}>
        <Finance
          title="Amount spent"
          from={TOTAL_BUDGET - this.state.prevBudget}
          to={TOTAL_BUDGET - this.props.budget}
        />
        <Players>
          {this.props.players
            .concat(emptyPlayers)
            .slice(0, TEAM_SIZE)
            .map((player, index) => {
              if (player) {
                return (
                  <Player key={player.id}>
                    <PlayerCard
                      selected
                      mini
                      onClick={this.props.onPlayerCardClick}
                      player={player}
                    />
                  </Player>
                );
              }

              return <Player key={index} />;
            })}
        </Players>
        <Finance
          colored
          title="Remaining budget"
          from={this.state.prevBudget}
          to={this.props.budget}
        />
      </Container>
    );
  }
}