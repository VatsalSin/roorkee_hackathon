import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginRequired from '../LoginRequired/LoginRequired';

import './Profile.css';
import adminImg from './admin.png';

class Profile extends Component {

  render() {
    
    if(this.props.isAuthenticated) {
      return (
        <div className="wrapper" style={{background: "red"}}>
          <div className="main-profile">
            <aside className="profile-card">
              <header>
                <a target="_blank" href="#">
                  <img src={adminImg} className="hoverZoomLink" alt="admin" />
                </a>
              </header>
              <div className="profile-bio">
                <h1>{ this.props.user.name }</h1>
                <h2>Aadhaar: { this.props.user.aadhaar }</h2>
                <p>
                  Email: { this.props.user.email }
                </p>
              </div>
              <ul className="profile-social-links" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <li>
                  <a target="_blank" href="https://www.facebook.com">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://twitter.com">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://github.com">
                    <i className="fab fa-github"></i>
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      )
    } else {
      return (
        <LoginRequired/>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default connect( mapStateToProps, {} )(Profile);