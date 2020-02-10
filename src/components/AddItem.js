import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem, setAddedItemsFalse } from '../redux/actions/itemActions';
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
    setAddedItemsFalse: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.setAddedItemsFalse();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    const { addedItem } = this.props.items;

    if (error !== prevProps.error) {
      this.setState({ msg: error.msg });
    }

    if (addedItem) {
      this.props.history.push('/');
    }
  }

  handleDataInput = e => {
    this.setState({ [e.target.name]: e.target.value });

    if (this.state.msg !== null) {
      this.props.clearErrors();
    }
  };

  handleCancel = e => {
    this.props.history.push('/');
  };

  handleSubmit = e => {
    e.preventDefault();

    const { description, responsible, priority } = this.state;
    const newItem = { description, responsible, priority };

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

          <div className="form-button-container">
            <button
              type="cancel"
              className="btn-primary"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn-success">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { error, items } = state;

  return { error, items };
}

export default connect(mapStateToProps, {
  addItem,
  setAddedItemsFalse,
  clearErrors
})(AddItem);
