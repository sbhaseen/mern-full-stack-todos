import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../redux/actions/itemActions';
import { clearErrors } from '../redux/actions/errorActions';
import './Forms.css';

class AddItem extends Component {
  state = {
    description: null,
    responsible: null,
    priority: null,
    msg: null
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      this.setState({ msg: error.msg });
    }

    // Redirect if action is successful
    // if (isAuthenticated) {
    //   this.props.history.push('/');
    // }
  }

  handleDataInput = e => {
    this.setState({ [e.target.name]: e.target.value });

    if (this.state.msg !== null) {
      this.props.clearErrors();
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { description, responsible, priority, completed } = this.state;
    const newItem = { description, responsible, priority, completed };

    this.props.addItem(newItem);
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <legend>Add a New Item</legend>
          {this.state.msg ? <small>{this.state.msg}</small> : null}

          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            placeholder="A description"
            onChange={this.handleDataInput}
            required
          />

          <label htmlFor="responsible">Responsible</label>
          <input
            name="responsible"
            type="text"
            placeholder="A responsible person"
            onChange={this.handleDataInput}
          />

          <label htmlFor="priority">Priority</label>
          <select name="priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button>Add</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { error } = state;

  return { error };
}

export default connect(mapStateToProps, { addItem, clearErrors })(AddItem);
