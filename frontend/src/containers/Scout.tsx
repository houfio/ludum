import * as React from 'react';
import { StyleSheet } from 'aphrodite/no-important';

import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { Box } from '../components/Box';
import { Heading } from '../components/Heading';
import { BIG_DESKTOP, DESKTOP, TABLET_LANDSCAPE, TABLET_PORTRAIT } from '../constants';
import { Hero } from '../components/Hero';

export const Scout = () => {
  const styleSheet = StyleSheet.create({
    boxes: {
      marginTop: '-8rem'
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 'calc(100% - 4rem)'
    },
    boxImage: {
      height: '7rem'
    }
  });

  const breakpointsFirst = {
    [TABLET_PORTRAIT]: 6,
    [TABLET_LANDSCAPE]: { size: 5, offset: 1 },
    [DESKTOP]: { size: 3, offset: 1.5 },
    [BIG_DESKTOP]: { size: 3, offset: 1.5 }
  };

  const breakpointsSecond = {
    [TABLET_PORTRAIT]: 6,
    [TABLET_LANDSCAPE]: 5,
    [DESKTOP]: 3,
    [BIG_DESKTOP]: 3
  };

  return (
    <>
      <Hero>
        <p>Test</p>
      </Hero>
      <Row styles={[styleSheet.boxes]}>
        <Column breakpoints={breakpointsFirst}>
          <Box styles={[styleSheet.box]}>
            <Heading text="Verbetering" type="thin"/>
            <p>Ik heb geen idee wat ik hier neer moet zetten</p>
          </Box>
        </Column>
        <Column breakpoints={breakpointsSecond}>
          <Box styles={[styleSheet.box]}>
            <Heading text="Snel & Vertrouwd" type="thin"/>
            <p>Hallo dokter, wat kan ik doen aan crippling depression?</p>
          </Box>
        </Column>
        <Column breakpoints={breakpointsSecond}>
          <Box styles={[styleSheet.box]}>
            <Heading text="Snel & Vertrouwd" type="thin"/>
            <p>Hallo dokter, wat kan ik doen aan crippling depression?</p>
          </Box>
        </Column>
      </Row>
    </>
  );
};
