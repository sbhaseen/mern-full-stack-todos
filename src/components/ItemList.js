import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../redux/actions/itemActions';
import './ItemList.css';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

function ListBody(props) {
  const items = props.items;
  const auth = props.auth;

  if (items.length > 0) {
    const itemsBody = items.map((item, index) => (
      <tr key={index}>
        <td>{item.description}</td>
        <td>{item.responsible}</td>
        <td>{item.priority}</td>
        <td>{item.completed.toString()}</td>
        {auth ? (
          <td>
            <button className="btn-primary">Edit</button>
            <button className="btn-danger">Delete</button>
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    ));

    return <tbody>{itemsBody}</tbody>;
  } else {
    return (
      <tbody>
        <tr>
          <td colSpan="5">No Data to Display</td>
        </tr>
      </tbody>
    );
  }
}

class ItemList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items, isLoading } = this.props.items;
    const { isAuthenticated } = this.props.auth;

    return (
      <section>
        {isAuthenticated ? (
          <div className="add-button">
            <Link to="/add" className="btn">
              Add Item
            </Link>
          </div>
        ) : (
          <p className="msg-banner">Please login to manage items.</p>
        )}

        <div className="table-container">
          <table className="item-list-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Responsible</th>
                <th>Priority</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan="5">
                    <LoadingSpinner />
                  </td>
                </tr>
              </tbody>
            ) : (
              <ListBody items={items} auth={isAuthenticated} />
            )}
          </table>
        </div>
        {isLoading ? null : (
          <div className="table-nav-container">
            <button disabled>Prev</button>
            <p>Page X of Y</p>
            <button>Next</button>
          </div>
        )}
      </section>
    );
  }
}

function mapStateToProps(state) {
  const { items, auth } = state;

  return { items, auth };
}

export default connect(mapStateToProps, { getItems })(ItemList);
