import {
  GET_NEXT_PAGE,
  GET_PREV_PAGE,
  SET_PAGE_ITEM_LIMIT
} from '../actions/actionTypes';

export function getNextPage() {
  return {
    type: GET_NEXT_PAGE
  };
}

export function getPrevPage() {
  return {
    type: GET_PREV_PAGE
  };
}

export function setPageItemLimit(itemLimit) {
  return {
    type: SET_PAGE_ITEM_LIMIT,
    payload: itemLimit
  };
}
