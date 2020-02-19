import React, { Component } from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/authActions';
import store from './redux/store';
import './App.css';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
