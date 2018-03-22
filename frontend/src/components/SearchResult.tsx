import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { Academy } from '../api/Academy';
import { Heading } from './Heading';

type Props = {
  academy: Academy,
  onClick: () => void
};

export const SearchResult = ({ academy, onClick }: Props) => {
  const styleSheet = StyleSheet.create({
    result: {
      display: 'flex',
      flexDirection: 'column',
      border: '2px solid #EBEBEB',
      borderRadius: '.5rem',
      padding: '2rem',
      cursor: 'pointer',
      transition: 'background-color .2s ease',
      ':not(:last-child)': {
        marginBottom: '2rem'
      },
      ':hover': {
        backgroundColor: '#EBEBEB'
      }
    }
  });

  return (
    <div className={css(styleSheet.result)} onClick={onClick}>
      <Heading text={academy.name} type="thin"/>
      <Heading text={academy.slogan} type="subtle"/>
      <div>
        hoi!
      </div>
    </div>
  );
};
