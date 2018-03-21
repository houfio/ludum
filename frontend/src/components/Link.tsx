import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { push } from 'react-router-redux';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { handle } from '../utils/handle';

type Props = {
  text: string,
  target: string,
  styles?: (CSSProperties | false)[]
}

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps<Props>()(undefined, getActionCreators);

export const Link = connect(class extends Component<typeof props> {
  public render() {
    const { text, target, styles = [] } = this.props;
    const { push } = this.props;

    const styleSheet = StyleSheet.create({
      link: {
        cursor: 'pointer',
        ':hover': {
          textDecoration: 'underline'
        }
      }
    });

    return (
      <span className={css(styleSheet.link, styles)} onClick={handle(push, target)}>{text}</span>
    );
  }
});
