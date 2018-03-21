import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { CSSProperties } from 'react';

type Props = {
  styles?: (CSSProperties | false)[]
}

export const Logo = ({ styles = [] }: Props) => {
  const styleSheet = StyleSheet.create({
    logo: {
      fontSize: '3rem',
      fontWeight: 500,
      color: '#FFFFFF',
      lineHeight: '1'
    }
  });

  return (
    <span className={css(styleSheet.logo, styles)}>ludum.</span>
  )
};
