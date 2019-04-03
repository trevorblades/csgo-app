import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import TwitterLogin from './twitter-login';
import Typography from '@material-ui/core/Typography';
import {FaFacebook} from 'react-icons/fa';
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
          <DialogTitle disableTypography>
            <Typography align="center" variant="h5">
              Log in
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TwitterLogin />
            <Typography align="center" variant="overline">
              or
            </Typography>
            <Button fullWidth disabled variant="contained">
              <FaFacebook size={20} style={{marginRight: 8}} />
              Log in with Facebook
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
