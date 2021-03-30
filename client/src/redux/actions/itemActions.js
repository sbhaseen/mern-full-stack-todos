import axios from 'axios';
import {
  GET_ITEMS,
  ITEMS_LOADING,
  ADD_ITEM,
  ADD_ITEM_PRELOAD,
  DELETE_ITEM,
  ITEMS_ERROR
} from './actionTypes';
import { returnErrors } from './errorActions';
import { headerConfig } from './authActions';
import api from '../../api';

/**
 * Handle fetching item data from the api.
 */
export function getItems(fetchPage, fetchLimit) {
  return dispatch => {
    let params = new URLSearchParams();
    params.append('page', fetchPage);
    params.append('limit', fetchLimit);

    const getUrl = api.getAllItems + params;

    dispatch(setItemsLoading());

    return axios
      .get(getUrl)
      .then(res =>
        dispatch({
          type: GET_ITEMS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(returnErrors(err));
        dispatch({ type: ITEMS_ERROR });
      });
  };
}

/**
 * A helper function to set a loading status.
 * Can be used for loading animations.
 */
export function setItemsLoading() {
  return {
    type: ITEMS_LOADING
  };
}

/**
 * A helper funciton to ensure added item status always starts falsy.
 */
export function setAddedItemsFalse() {
  return {
    type: ADD_ITEM_PRELOAD
  };
}

/**
 * Handle the addition of a new item.
 * @param {Object} item - The data of a new item.
 */
export function addItem(item) {
  return (dispatch, getState) => {
    const postUrl = api.createItem;

    return axios
      .post(postUrl, item, headerConfig(getState))
      .then(res => {
        dispatch({
          type: ADD_ITEM,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch(returnErrors(err));
      });
  };
}

/**
 * Handle updating the data of an existing item.
 * @param {Object} item - The new updated data of the item.
 */
export function updateItem(item) {
  return (dispatch, getState) => {
    const putUrl = api.updateItem + item.id;

    return axios
      .put(putUrl, item, headerConfig(getState))
      .then(res => {
        dispatch({
          type: ADD_ITEM,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch(returnErrors(err));
      });
  };
}

/**
 * Handle the deletion of an item.
 * @param {string} id - The id of an existing item.
 */
export function deleteItem(id) {
  return (dispatch, getState) => {
    const deleteUrl = api.deleteItem + id;

    return axios
      .delete(deleteUrl, headerConfig(getState))
      .then(res => {
        dispatch({
          type: DELETE_ITEM,
          payload: id
        });
      })
      .catch(err => dispatch(returnErrors(err)));
  };
}
