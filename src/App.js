import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Countdown from './containers/Countdown/Countdown';
import Timer from './containers/Timer/Timer';
import Home from './components/pages/Home/Home';
import classes from './App.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/countdown' component={Countdown} />
        <Route path='/timer' component={Timer} />
        <Redirect to='/' />
      </Switch>
    )
    return (
      <div className={classes.app}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
