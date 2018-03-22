import * as React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router';
import { createLocation } from 'history';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { Home } from '../containers/Home';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Login } from '../containers/Login';
import { Academy } from '../containers/Academy';
import { Search } from '../containers/Search';
import { Register } from '../containers/Register';
import { Scout } from '../containers/Scout';
import { Profile } from '../containers/Profile';
import { content } from '../modules/content';
import { Logout } from '../containers/Logout';
import { Balance } from '../containers/Balance';

const mapStateToProps = (state: State) => ({
  location: state.router.location
});

const getActionCreators = () => ({
  getPositions: content.getPositions
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Root = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { getPositions } = this.props;

    getPositions();
  }

  public render() {
    const { location } = this.props;

    const styleSheet = StyleSheet.create({
      body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      },
      main: {
        flex: '1'
      }
    });

    return (
      <div className={css(styleSheet.body)}>
        <Navigation/>
        <main className={css(styleSheet.main)}>
          <Switch location={location || createLocation(window.location.href)}>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/login" exact={true} component={Login}/>
            <Route path="/logout" exact={true} component={Logout}/>
            <Route path="/register" exact={true} component={Register}/>
            <Route path="/search" exact={true} component={Search}/>
            <Route path="/academy/:id" exact={true} component={Academy}/>
            <Route path="/scout" exact={true} component={Scout}/>
            <Route path="/profile" exact={true} component={Profile}/>
            <Route path="/balance" exact={true} component={Balance}/>
          </Switch>
        </main>
        <Footer/>
      </div>
    );
  }
});
