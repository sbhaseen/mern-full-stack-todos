import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { login } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import { connect } from 'react-redux';
import './Forms.css';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { isAuthenticated, error } = this.props;

    if (error !== prevProps.error) {
      this.setState({ msg: error.msg });
    }

    // Redirect if action is successful
    if (isAuthenticated) {
      this.props.history.push('/');
    }
  }

  handleDataInput = e => {
    this.setState({ [e.target.name]: e.target.value });

    if (this.state.msg !== null) {
      this.props.clearErrors();
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const userData = { email, password };

    this.props.login(userData);
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <legend>Login</legend>
          {this.state.msg ? <small>{this.state.msg}</small> : null}

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Your email"
            onChange={this.handleDataInput}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Your password"
            onChange={this.handleDataInput}
            required
          />

          <button>Login</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.auth;
  const { error } = state;

  return { isAuthenticated, error };
}

export default connect(mapStateToProps, { login, clearErrors })(LoginForm);
