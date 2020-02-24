import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../redux/actions/itemActions';
import {
  getNextPage,
  getPrevPage,
  setPageItemLimit
} from '../redux/actions/paginationActions';
import TableBody from './TableBody';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';
import './ItemList.css';

export class ItemList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems(
      this.props.pagination.currentPage,
      this.props.pagination.itemLimit
    );
  }

  componentDidUpdate() {
    if (this.props.pagination.currentPage > this.props.pagination.total.pages) {
      this.handlePreviousPage();
    }
  }

  handleNextPage = e => {
    this.props.getNextPage();
    this.props.getItems(
      this.props.pagination.nextPage,
      this.props.pagination.itemLimit
    );
  };

  handlePreviousPage = e => {
    this.props.getPrevPage();
    this.props.getItems(
      this.props.pagination.previousPage,
      this.props.pagination.itemLimit
    );
  };

  handleLimitSelection = e => {
    const newItemLimit = parseInt(e.target.value);

    if (newItemLimit !== this.props.pagination.itemLimit) {
      this.props.setPageItemLimit(newItemLimit);
      this.props.getItems(this.props.pagination.currentPage, newItemLimit);
    }
  };

  render() {
    const { items, isLoading } = this.props.items;
    const { isAuthenticated } = this.props.auth;

    return (
      <>
        <div className="table-top">
          <div className="item-limit-container">
            <label htmlFor="item-limit">Items per page: </label>
            <select
              id="item-limit"
              name="item-limit"
              onChange={this.handleLimitSelection}
              defaultValue={this.props.pagination.itemLimit}
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
