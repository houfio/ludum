import * as React from 'react';
import { Component } from 'react';

import { withProps } from '../utils/withProps';
import { auth } from '../modules/auth';
import { Redirect } from 'react-router';

const getActionCreators = () => ({
  logout: auth.logout
});

const { props, connect } = withProps()(undefined, getActionCreators);

export const Logout = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { logout } = this.props;

    logout();
  }

  public render() {
    return (
      <Redirect to={'/'}/>
    );
  }
});
