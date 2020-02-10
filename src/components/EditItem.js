import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getOneItem,
  updateItem,
  setAddedItemsFalse
} from '../redux/actions/itemActions';
import { clearErrors } from '../redux/actions/errorActions';
import './Forms.css';

class EditItem extends Component {
  state = {
    id: this.props.location.state.item._id,
    description: this.props.location.state.item.description,
    responsible: this.props.location.state.item.responsible,
    priority: this.props.location.state.item.priority,
    completed: this.props.location.state.item.completed,
    msg: null
  };

  static propTypes = {
    setAddedItemsFalse: PropTypes.func.isRequired,
    getOneItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
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

  handleCheckboxInput = e => {
    // this.setState(prevState => ({ completed: !prevState.completed }));
    this.setState(prevState => ({ completed: !prevState.completed }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { id, description, responsible, priority, completed } = this.state;
    const newItem = { id, description, responsible, priority, completed };

    this.props.updateItem(newItem);
  };

  render() {
    const { id } = this.props.match.params;
    const { item } = this.props.location.state;

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <legend>Edit Item: {id}</legend>
          {this.state.msg ? <small>{this.state.msg}</small> : null}

          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            placeholder="A description"
            defaultValue={item.description}
            onChange={this.handleDataInput}
            required
          />

          <label htmlFor="responsible">Responsible</label>
          <input
            name="responsible"
            type="text"
            placeholder="A responsible person"
            defaultValue={item.responsible}
            onChange={this.handleDataInput}
          />

          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            defaultValue={item.priority}
            onChange={this.handleDataInput}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="completed">Completed</label>
          <input
            name="completed"
            type="checkbox"
            defaultChecked={this.state.completed}
            onChange={this.handleCheckboxInput}
          />

          <button>Submit</button>
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
  getOneItem,
  updateItem,
  setAddedItemsFalse,
  clearErrors
})(EditItem);
