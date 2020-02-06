import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import PropTypes from 'prop-types';
import './NavBar.css';

class NavBar extends Component {
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
        <Link className="nav-item" to="/register">
          Register
        </Link>
        <Link className="nav-item" to="/login">
          Login
        </Link>
      </Fragment>
    );

    const authLinks = (
      <Fragment>
        <Link className="nav-item" to="/" onClick={this.props.logout}>
          Logout
        </Link>
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
          <Link className="nav-item" to="/">
            Home
          </Link>
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
