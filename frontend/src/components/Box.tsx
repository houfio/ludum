import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

type Props = {
  children: ReactNode,
  styles?: (CSSProperties | false)[],
  tag?: string,
  flat?: boolean
}

export const Box = ({ children, styles = [], tag: Tag = 'div', flat }: Props) => {
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
    flat: {
      boxShadow: 'none',
      border: '2px solid #EBEBEB'
    },
    inner: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%'
    },
    wrapper: {
      padding: '2rem'
    }
  });

  return (
    <Tag className={css(styleSheet.box, flat && styleSheet.flat)}>
      <div className={css(styleSheet.inner)}>
        <div className={css(styleSheet.wrapper, styles)}>
          {children}
        </div>
      </div>
    </Tag>
  );
};
