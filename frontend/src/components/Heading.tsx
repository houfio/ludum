import * as React from 'react';
import { CSSProperties } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { HeadingTypes } from '../types';

type Props = {
  text: string,
  type: HeadingTypes,
  styles?: (CSSProperties | false)[]
}

const headingSizes: { [T in HeadingTypes]: CSSProperties } = {
  bold: {
    fontSize: '2rem',
    fontWeight: 'bold',
    opacity: .85,
    marginBottom: '.5rem'
  },
  thin: {
    fontSize: '1.5rem',
    marginBottom: '.5rem'
  },
  subtle: {
    fontSize: '.75rem',
    textTransform: 'uppercase',
    opacity: .6,
    margin: '-.5rem 0 .5rem 0'
  }
};

export const Heading = ({ text, type, styles = [] }: Props) => {
  const styleSheet = StyleSheet.create({
    heading: {
      display: 'block',
      ...headingSizes[type] as any
    }
  });

  return (
    <span className={css(styleSheet.heading, styles)}>{text}</span>
  );
};
