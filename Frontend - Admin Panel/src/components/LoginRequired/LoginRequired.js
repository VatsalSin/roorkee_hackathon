import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { openLoginModal } from "../../redux/actions/authActions";

const styles = theme => ({
  root: {
      width: '100%',
      padding: '25px'
  },
  button: {
      margin: theme.spacing.unit,
  },
});
class LoginRequired extends React.Component {

  openLoginModal = () => {
    this.props.openLoginModal();
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <Typography gutterBottom>
              Please login to view this page!
        </Typography>
        <Button variant="contained" color="secondary" className={classes.button} onClick={this.openLoginModal}>
          Login
        </Button>
      </div>
    );
  }
}

export default compose(
  connect( null, {openLoginModal} ),
  withStyles(styles, { withTheme: true }),
)(LoginRequired);