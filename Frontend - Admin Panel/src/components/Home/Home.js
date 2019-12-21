import React from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {AppBar, Button, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar,Typography, Fab, Tooltip} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

import 'antd/dist/antd.css';
import {  Avatar, Icon } from "antd";
import './home.css';

import LoginModal from '../LoginModal/LoginModal';
import Profile from '../Profile/Profile';
import Roads from '../Roads/Roads';
import Road from '../Roads/Road';

import { openLoginModal } from "../../redux/actions/authActions";
import {signOut} from '../../redux/actions/authActions';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
  },
});

class Home extends React.Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    openLoginModal: PropTypes.func.isRequired,
    anchorEl: null,
  };

  state = {
    mobileOpen: false,
    anchorEl: null
  };

  signOut= async ()=> {
    await this.props.signOut();
    if(!this.props.isAuth) {
      this.props.history.push('/');
    }
  }

  openLoginModal = () => {
    this.props.openLoginModal();
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleCloseAndSignout = async () => {
    this.signOut();
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const {
      isAuthenticated,
      user,
      openloginModal
    } = this.props.auth;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const drawer = (
      <div>
        <div className={classes.toolbar} style={{background: 'blue', padding: '5px', display: 'flex', alignItems: 'center'}}>
          <Avatar style={{ backgroundColor: '#fff', color: '#000' }} icon="user" />
          <span style={{margin: '5px', color: '#fff', fontWeight: 'bold'}}>{isAuthenticated ? user.name.split(' ')[0] : "Unauthorized"}</span>
        </div>
        <Divider />
        <List>
          <ListItem button key='roads' component={Link} to='/roads' onClick={this.handleDrawerClose} >
            <Icon type="unordered-list" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;
            <ListItemText primary='Roads' />
          </ListItem>
          <ListItem button key='link' component={Link} to='/route' onClick={this.handleDrawerClose} >
            <Icon type="unordered-list" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
            <ListItemText primary='Link' />
          </ListItem>
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} style={{'background': 'blue'}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              Admin Panel
            </Typography>

            {!isAuthenticated && (
              <Button color="inherit" onClick={this.openLoginModal}>Login</Button>
            )}
            {openloginModal ? <LoginModal /> : null}

            {isAuthenticated && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose} component={Link} to='/profile'>Profile</MenuItem>
                  <MenuItem onClick={this.handleCloseAndSignout }>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content} >
          <div className={classes.toolbar} />
          {/* {this.props.user && this.props.user.active ===0 ? <ActiveRequired /> : null} */}
          <Route exact path="/" component={Roads} />
          <Switch>
            <Route exact path="/roads" component={Roads} />
            <Route exact path="/road/:_id" component={Road} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </main>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
    user: state.auth.user
  }
}

const WrappedHome=withRouter(connect( mapStateToProps, {openLoginModal, signOut} )(Home));
export default compose(
  withStyles(styles, { withTheme: true }),
)(WrappedHome);