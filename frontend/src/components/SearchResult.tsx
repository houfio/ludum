import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { Academy } from '../api/Academy';
import { Heading } from './Heading';
import { Rating } from './Rating';

type Props = {
  academy: Academy,
  onClick: () => void
};

export const SearchResult = ({ academy, onClick }: Props) => {
  const styleSheet = StyleSheet.create({
    result: {
      position: 'relative',
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
    },
    ad: {
      border: '2px solid #68B34C',
    },
    adBox: {
      position: 'absolute',
      color: '#FFFFFF',
      backgroundColor: '#68B34C',
      padding: '.5rem',
      borderRadius: '0 0 0 .5rem',
      top: 0,
      right: 0
    },
    bottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '2rem'
    }
  });

  let ages = 'Alle leeftijden';

  if (academy.min_age && !academy.max_age) {
    ages = `${academy.min_age}+`;
  } else if (!academy.min_age && academy.max_age) {
    ages = `< ${academy.max_age}`;
  } else if (academy.min_age && academy.max_age) {
    ages = `${academy.min_age}-${academy.max_age}`;
  }

  return (
    <div
      className={css(
        styleSheet.result,
        academy.promotion && styleSheet.ad
      )}
      onClick={onClick}
    >
      {academy.promotion && (
        <div className={css(styleSheet.adBox)}>AD</div>
      )}
      <Heading text={academy.name} type="thin"/>
      <Heading text={academy.slogan} type="subtle"/>
      <div className={css(styleSheet.bottom)}>
        <Rating rating={academy.stars}/>
        <span>{academy.city} | {ages}</span>
      </div>
    </div>
  );
};
