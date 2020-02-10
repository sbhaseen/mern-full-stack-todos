import React, { Component } from 'react';
// import NavBar from './components/NavBar';
// import ItemList from './components/ItemList';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import AddItem from './components/AddItem';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/authActions';
import store from './redux/store';
import './App.css';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  // render() {
  //   return (
  //     <Provider store={store}>
  //       <Router>
  //         <NavBar />
  //         <Route exact path="/" component={ItemList} />
  //         <Route path="/login" component={LoginForm} />
  //         <Route path="/register" component={RegisterForm} />
  //         <Route path="/add" component={AddItem} />
  //       </Router>
  //     </Provider>
  //   );
  // }

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
