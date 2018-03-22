import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

export const Select = ({ styles = [], ...props }) => {
  const { input } = props;

  const styleSheet = StyleSheet.create({
    select: {
      backgroundColor: '#EBEBEB',
      padding: '1.25rem 2.25rem',
      border: 'none',
      borderRadius: '2rem',
      appearance: 'none',
      '::placeholder': {
        fontWeight: 600
      }
    }
  });

  return (
    <select className={css(styleSheet.select, styles)} {...props} {...input}/>
  );
};
