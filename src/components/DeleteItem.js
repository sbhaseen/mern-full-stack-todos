import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem } from '../redux/actions/itemActions';
import './Forms.css';
import './DeleteItem.css';

class DeleteItem extends Component {
  state = {
    id: this.props.location.state.item._id,
    description: this.props.location.state.item.description,
    responsible: this.props.location.state.item.responsible,
    priority: this.props.location.state.item.priority,
    completed: this.props.location.state.item.completed
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
        <div className="delete-form" onSubmit={this.handleSubmit}>
          <h1>Delete Item:</h1>
          <h2>ID: {id}</h2>
          <h3>Are you sure you want to delete this item?</h3>

          <div className="info-group">
            <h4>Description</h4>
            <p>{item.description}</p>
          </div>

          <div className="info-group">
            <h4>Responsible</h4>
            <p>{item.responsible}</p>
          </div>

          <div className="info-group">
            <h4>Priority</h4>
            <p>{item.priority}</p>
          </div>

          <h4 htmlFor="completed">Completed</h4>
          <input
            name="completed"
            type="checkbox"
            defaultChecked={this.state.completed}
            readOnly
          />

          <div className="form-button-container">
            <button className="btn-primary" onClick={this.handleCancel}>
              Cancel
            </button>
            <button className="btn-danger" onClick={this.handleSubmit}>
              Delete
            </button>
          </div>
        </div>
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
