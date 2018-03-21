import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { Logo } from './Logo';
import { withProps } from '../utils/withProps';
import { handle } from '../utils/handle';
import { push } from 'react-router-redux';

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps()(undefined, getActionCreators);

export const Navigation = connect(class extends Component<typeof props> {
  public render() {
    const { push } = this.props;

    const styleSheet = StyleSheet.create({
      navigation: {
        display: 'flex',
        backgroundColor: '#68B34C',
        padding: '2rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#FFFFFF'
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
        <Logo/>
        <span className={css(styleSheet.item)} onClick={handle(push, '/login')}>inloggen</span>
      </nav>
    );
  }
});
