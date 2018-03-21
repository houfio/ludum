import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { push } from 'react-router-redux';

import { withProps } from '../utils/withProps';
import { handle } from '../utils/handle';

type Props = {
  styles?: (CSSProperties | false)[]
}

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps<Props>()(undefined, getActionCreators);

export const Logo = connect(class extends Component<typeof props> {
  public render() {
    const { styles = [] } = this.props;
    const { push } = this.props;

    const styleSheet = StyleSheet.create({
      logo: {
        fontSize: '3rem',
        fontWeight: 600,
        color: '#FFFFFF',
        cursor: 'pointer',
        lineHeight: '1'
      }
    });

    return (
      <span className={css(styleSheet.logo, styles)} onClick={handle(push, '/')}>ludum.</span>
    )
  }
});
