import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { Heading } from '../components/Heading';

export const Home = () => {
  const styleSheet = StyleSheet.create({
    header: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      padding: '9rem 0 16rem 0',
      color: '#FFFFFF'
    },
    headerBackground: {
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
    <div className={css(styleSheet.header)}>
      <div className={css(styleSheet.headerBackground)}/>
      <Heading text="Zoek jouw voetbalschool" type="thin"/>
    </div>
  );
};
