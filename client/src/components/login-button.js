import FacebookLogin from './facebook-login';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import TwitterButton from './twitter-button';
import TwitterLogin from './twitter-login';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core';
import {MdVpnKey} from 'react-icons/md';

export default class LoginButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string
  };

  static defaultProps = {
    text: 'Log in'
  };

  state = {
    dialogOpen: false
  };

  onClick = () => {
    this.setState({
      dialogOpen: true
    });
  };

  closeDialog = () => {
    this.setState({
      dialogOpen: false
    });
  };

  render() {
    return (
      <Fragment>
        <Button
          className={this.props.className}
          onClick={this.onClick}
          variant={this.props.variant}
          size={this.props.size}
          color="primary"
        >
          <MdVpnKey size={20} style={{marginRight: 8}} />
          {this.props.text}
        </Button>
        <Dialog
          maxWidth="xs"
          fullWidth
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
        >
          <DialogTitle>Pick your poison</DialogTitle>
          <DialogContent>
            <TwitterLogin>{props => <TwitterButton {...props} />}</TwitterLogin>
            <Typography
              display="block"
              color="textSecondary"
              align="center"
              variant="overline"
            >
              or
            </Typography>
            <FacebookLogin />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}