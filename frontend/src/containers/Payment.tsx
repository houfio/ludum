import * as React from 'react';
import { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { createApiRequest } from '../utils/createApiRequest';
import { Hero } from '../components/Hero';
import { Heading } from '../components/Heading';

type Params = {
  id: string
}

type LocalState = {
  redirect: boolean,
  success: boolean
}

const mapStateToProps = (state: State) => ({
  token: state.auth.token
});

const { props, connect } = withProps<{}, RouteComponentProps<Params>>()(mapStateToProps);

export const Payment = connect(class extends Component<typeof props, LocalState> {
  public state = {
    redirect: false,
    success: false
  };

  public componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { token } = this.props;

    if (!token || isNaN(+id)) {
      return;
    }

    createApiRequest('get', `payments/${id}`, undefined, { token }).then(() => {
      this.setState({
        success: true
      });

      setTimeout(
        () => {
          this.setState({
            redirect: true
          });
        },
        3000
      )
    });
  }

  public render() {
    const { success, redirect } = this.state;

    if (!success) {
      return false;
    } else if (redirect) {
      return (
        <Redirect to="/balance"/>
      )
    }

    const styleSheet = StyleSheet.create({
      hero: {
        marginBottom: '6rem'
      }
    });

    return (
      <Hero inverse={true} styles={[styleSheet.hero]}>
        <Heading text="Betaling voltooid! U word doorgestuurd in 3 seconden..." type="bold"/>
      </Hero>
    );
  }
});
