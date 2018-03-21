import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

type Props = {
  children: ReactNode,
  styles?: (CSSProperties | false)[],
  tag?: string
};

export const Hero = ({ children, styles = [], tag: Tag = 'div' }: Props) => {
  const styleSheet = StyleSheet.create({
    hero: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
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
      transform: 'skewY(-3deg)',
      transformOrigin: 'center left',
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
