import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { register } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import { connect } from 'react-redux';
import './Forms.css';

export class RegisterForm extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    password2: null,
    passMatch: false,
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired,
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

  checkPasswords = () => {
    if (
      this.state.password &&
      this.state.password2 &&
      this.state.password === this.state.password2
    ) {
      this.setState({ passMatch: true });
    } else {
      this.setState({ passMatch: false });
    }
  };

  handleDataInput = e => {
    this.setState({ [e.target.name]: e.target.value }, this.checkPasswords);

    if (this.state.msg !== null) {
      this.props.clearErrors();
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const newUser = { name, email, password };

    this.props.register(newUser);
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <legend>Register</legend>
          {this.state.msg ? <small>{this.state.msg}</small> : null}

          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            onChange={this.handleDataInput}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            onChange={this.handleDataInput}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            onChange={this.handleDataInput}
            required
          />

          <label htmlFor="password2">Re-enter Password</label>
          <input
            id="password2"
            name="password2"
            type="password"
            placeholder="Your password again"
            onChange={this.handleDataInput}
            required
          />

          <div className="form-button-container">
            <button
              className="btn-success"
              type="submit"
              disabled={this.state.passMatch ? false : true}
            >
              Register
            </button>
            <button className="btn-warning" type="reset">
              Reset
            </button>
          </div>
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

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterForm
);
