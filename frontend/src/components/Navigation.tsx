import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { Logo } from './Logo';
import { withProps } from '../utils/withProps';
import { handle } from '../utils/handle';
import { push } from 'react-router-redux';
import { State } from '../types';
import { Container } from './Container';

const mapStateToProps = (state: State) => ({
  token: state.auth.token
});

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Navigation = connect(class extends Component<typeof props> {
  public render() {
    const { token } = this.props;
    const { push } = this.props;

    const styleSheet = StyleSheet.create({
      navigation: {
        display: 'flex',
        backgroundColor: '#68B34C',
        padding: '2rem',
        color: '#FFFFFF'
      },
      container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      item: {
        padding: '.5rem 1rem',
        borderRadius: '2rem',
        cursor: 'pointer',
        transition: 'all .2s ease',
        ':hover': {
          color: '#68B34C',
          backgroundColor: '#FFFFFF'
        }
      }
    });

    return (
      <nav className={css(styleSheet.navigation)}>
        <Container styles={[styleSheet.container]}>
          <Logo/>
          {token ? (
            <span className={css(styleSheet.item)} onClick={handle(push, '/profile')}>profiel</span>
          ) : (
            <span className={css(styleSheet.item)} onClick={handle(push, '/login')}>inloggen</span>
          )}
        </Container>
      </nav>
    );
  }
});
