import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

type Props = {
  children: ReactNode,
  styles?: (CSSProperties | false)[],
  tag?: string
}

export const Box = ({ children, styles = [], tag: Tag = 'div' }: Props) => {
  const styleSheet = StyleSheet.create({
    box: {
      position: 'relative',
      background: '#FFFFFF',
      boxShadow: '0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)',
      margin: '2rem',
      borderRadius: '.25rem',
      ':before': {
        content: '""',
        display: 'block',
        paddingTop: '100%'
      }
    },
    inner: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      padding: '2rem'
    }
  });

  return (
    <Tag className={css(styleSheet.box, styles)}>
      <div className={css(styleSheet.inner)}>
        {children}
      </div>
    </Tag>
  );
};
