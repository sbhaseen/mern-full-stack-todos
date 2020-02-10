import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, setAddedItemsFalse } from '../redux/actions/itemActions';
import { clearErrors } from '../redux/actions/errorActions';
import './Forms.css';

class DeleteItem extends Component {
  state = {
    id: this.props.location.state.item._id,
    description: this.props.location.state.item.description,
    responsible: this.props.location.state.item.responsible,
    priority: this.props.location.state.item.priority,
    completed: this.props.location.state.item.completed,
    msg: null
  };

  static propTypes = {
    deleteItem: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired
  };

  handleCancel = e => {
    this.props.history.push('/');
  };

  handleSubmit = e => {
    const { id } = this.state;

    this.props.deleteItem(id);
    this.props.history.push('/');
  };

  render() {
    const { id } = this.props.match.params;
    const { item } = this.props.location.state;

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <legend>Delete Item: {id}</legend>
          <h1>Are you sure you want to delete this item?</h1>

          <label htmlFor="description">Description</label>
          <p name="description">{item.description}</p>

          <label htmlFor="responsible">Responsible</label>
          <p name="responsible">{item.responsible}</p>

          <label htmlFor="priority">Priority</label>
          <p name="priority">{item.priority}</p>

          <label htmlFor="completed">Completed</label>
          <input
            name="completed"
            type="checkbox"
            defaultChecked={this.state.completed}
            readOnly
          />

          <button className="btn-primary" onClick={this.handleCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={this.handleSubmit}>
            Delete
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items } = state;

  return { items };
}

export default connect(mapStateToProps, {
  deleteItem
})(DeleteItem);
