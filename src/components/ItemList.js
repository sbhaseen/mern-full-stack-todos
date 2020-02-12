import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../redux/actions/itemActions';
import './ItemList.css';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

function TableBody(props) {
  const items = props.items;
  const auth = props.auth;

  if (items.data && items.data.length > 0) {
    const itemsBody = items.data.map((item, index) => (
      <tr key={index}>
        <td>{item.description}</td>
        <td>{item.responsible}</td>
        <td>{item.priority}</td>
        <td>{item.completed.toString()}</td>
        {auth ? (
          <td>
            <Link
              to={{ pathname: `/edit/${item._id}`, state: { item } }}
              className="btn btn-primary"
            >
              Edit
            </Link>

            <Link
              to={{ pathname: `/delete/${item._id}`, state: { item } }}
              className="btn btn-danger"
            >
              Delete
            </Link>
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
      <>
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
                <TableBody items={items} auth={isAuthenticated} />
              )}
            </table>
          </div>
          {isLoading ? null : (
            <div className="table-nav-container">
              <button disabled={this.props.items.items.previous ? false : true}>
                Prev
              </button>
              <p>
                Page{' '}
                {this.props.items.items.next - this.props.items.items.previous}
                of Y
              </p>
              <button disabled={this.props.items.items.next ? false : true}>
                Next
              </button>
            </div>
          )}
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { items, auth } = state;

  return { items, auth };
}

export default connect(mapStateToProps, { getItems })(ItemList);
