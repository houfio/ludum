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

const mapStateToProps = (state: State) => ({
  location: state.router.location
});

const { props, connect } = withProps()(mapStateToProps);

export const Root = connect(class extends Component<typeof props> {
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
          </Switch>
        </main>
        <Footer/>
      </div>
    );
  }
});