import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

export const Input = ({ styles = [], ...props }) => {
  const { input } = props;

  const styleSheet = StyleSheet.create({
    input: {
      backgroundColor: '#EBEBEB',
      padding: '1.25rem 2.25rem',
      border: 'none',
      borderRadius: '2rem',
      '::placeholder': {
        fontWeight: 600,
        textAlign: 'center'
      }
    }
  });

  return (
    <input className={css(styleSheet.input, styles)} {...props} {...input}/>
  );
};
