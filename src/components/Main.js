import React, { Component } from 'react';
import NavBar from './NavBar';
import ItemList from './ItemList';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AddItem from './AddItem';
import NotFound from './NotFound';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';

function RedirectComponent(props) {
  return <Redirect to="404" />;
}

class Main extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={ItemList} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route
            path="/add"
            component={isAuthenticated ? AddItem : RedirectComponent}
          />
          <Route
            path="/edit/:id"
            component={isAuthenticated ? EditItem : RedirectComponent}
          />
          <Route
            path="/delete/:id"
            component={isAuthenticated ? DeleteItem : RedirectComponent}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;

  return { auth };
}

export default connect(mapStateToProps)(Main);
