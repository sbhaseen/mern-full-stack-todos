import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../redux/actions/itemActions';
import {
  getNextPage,
  getPrevPage,
  setPageItemLimit
} from '../redux/actions/paginationActions';
import './ItemList.css';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

function TableBody(props) {
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
    this.props.getItems(
      this.props.pagination.currentPage,
      this.props.pagination.pageLimit
    );
  }

  handleNextPage = e => {
    this.props.getNextPage();
    this.props.getItems(
      this.props.pagination.nextPage,
      this.props.pagination.pageLimit
    );
  };

  handlePreviousPage = e => {
    this.props.getPrevPage();
    this.props.getItems(
      this.props.pagination.previousPage,
      this.props.pagination.pageLimit
    );
  };

  handleLimitSelection = e => {
    const newPageLimit = parseInt(e.target.value);

    if (newPageLimit !== this.props.pagination.pageLimit) {
      this.props.setPageItemLimit(newPageLimit);
      this.props.getItems(this.props.pagination.currentPage, newPageLimit);
    }
  };

  render() {
    const { items, isLoading } = this.props.items;
    const { isAuthenticated } = this.props.auth;

    return (
      <>
        <section>
          <div className="table-top">
            <div className="item-limit-container">
              <label htmlFor="item-limit">Items per page: </label>
              <select
                name="item-limit"
                onChange={this.handleLimitSelection}
                defaultValue={this.props.pagination.pageLimit}
                disabled={this.props.items.items.length > 0 ? false : true}
              >
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>
            {isAuthenticated ? (
              <div className="add-button">
                <Link to="/add" className="btn">
                  Add Item
                </Link>
              </div>
            ) : (
              <p className="msg-banner">Please login to manage items.</p>
            )}
          </div>

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
              <button
                disabled={this.props.pagination.previousPage ? false : true}
                onClick={this.handlePreviousPage}
              >
                Prev
              </button>

              <p>
                Page {this.props.pagination.currentPage} of{' '}
                {this.props.pagination.total.pages}
              </p>

              <button
                disabled={this.props.pagination.nextPage ? false : true}
                onClick={this.handleNextPage}
              >
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
  const { items, auth, pagination } = state;

  return { items, auth, pagination };
}

export default connect(mapStateToProps, {
  getItems,
  getNextPage,
  getPrevPage,
  setPageItemLimit
})(ItemList);
