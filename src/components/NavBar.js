import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import PropTypes from 'prop-types';
import './NavBar.css';

export class NavBar extends Component {
  state = {
    toggleNavMenu: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  handleMenuButtonClick = () => {
    this.setState(prevState => ({ toggleNavMenu: !prevState.toggleNavMenu }));
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <Fragment>
        <li className="nav-item">
          <Link to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
      </Fragment>
    );

    const authLinks = (
      <Fragment>
        <li className="nav-item">
          <Link to="/" onClick={this.props.logout}>
            Logout
          </Link>
        </li>
      </Fragment>
    );

    return (
      <nav className={this.state.toggleNavMenu ? 'toggled' : ''}>
        <h1 className="logo">MERN Stack List</h1>
        <button
          onClick={this.handleMenuButtonClick}
          className="menu-toggle"
          aria-label="nav menu toggle"
        >
          <div className="hamburger"></div>
        </button>

        <ul className="nav-list" onClick={this.handleMenuButtonClick}>
          {isAuthenticated ? (
            <li className="nav-welcome">Welcome, {user ? user.name : null}</li>
          ) : null}
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps, { logout })(NavBar);
