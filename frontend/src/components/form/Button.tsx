import * as React from 'react';
import { CSSProperties } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { ButtonTypes } from '../../types';

type Props = {
  text: string,
  type?: ButtonTypes,
  htmlType?: 'button' | 'submit' | 'reset',
  onClick?: () => void,
  styles?: (CSSProperties | false)[]
}

const buttonStyles: { [T in ButtonTypes]: CSSProperties } = {
  primary: {
    color: '#FFFFFF',
    backgroundColor: '#68B34C',
    ':hover': {
      backgroundColor: '#5DA145'
    }
  },
  secondary: {
    color: '#000000',
    backgroundColor: '#EBEBEB',
    ':hover': {
      backgroundColor: '#F0F0F0'
    }
  }
};

export const Button = ({ text, type = 'primary', htmlType, onClick, styles = [] }: Props) => {
  const styleSheet = StyleSheet.create({
    button: {
      display: 'inline-block',
      padding: '1.25rem 2.25rem',
      fontWeight: 600,
      cursor: 'pointer',
      border: 'none',
      borderRadius: '2rem',
      transition: 'background-color .2s ease',
      ...buttonStyles[type] as any
    }
  });

  return (
    <button className={css(styleSheet.button, styles)} onClick={onClick} type={htmlType}>{text}</button>
  );
};
