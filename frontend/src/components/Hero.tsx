import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

type Props = {
  children: ReactNode,
  inverse?: boolean,
  styles?: (CSSProperties | false)[],
  tag?: string
};

export const Hero = ({ children, inverse = false, styles = [], tag: Tag = 'div' }: Props) => {
  const styleSheet = StyleSheet.create({
    hero: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '9rem 0 16rem 0',
      color: '#FFFFFF'
    },
    heroBackground: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: '#68B34C',
      transform: `skewY(${inverse ? '3' : '-3'}deg)`,
      transformOrigin: `center ${inverse ? 'right' : 'left'}`,
      zIndex: -1
    }
  });

  return (
    <Tag className={css(styleSheet.hero, styles)}>
      <div className={css(styleSheet.heroBackground)}/>
      {children}
    </Tag>
  );
};
