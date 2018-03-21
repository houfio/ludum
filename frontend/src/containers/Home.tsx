import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { Heading } from '../components/Heading';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { PHONE, TABLET_LANDSCAPE } from '../constants';
import { Button } from '../components/Button';
import { Hero } from '../components/Hero';
import { Box } from '../components/Box';
import { forBreakpoint } from '../utils/forBreakpoint';

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
    },
    promoImage: {
      padding: '0rem 6rem 0rem 6rem'
    },
    promo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0rem 6rem',
      textAlign: 'left',
      height: '100%',
      ...forBreakpoint(PHONE, {
        padding: '2rem',
        alignItems: 'center',
        textAlign: 'center',
      })
    },
    promoText: {
      padding: '0 0 1rem 0'
    },
    promoHeader: {
      display: 'inline-block',
      textAlign: 'left',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    row: {
      marginTop: '-14rem'
    },
    box: {
      margin: '5rem'
    }
  });

  return (
    <>
      <Hero>
        <Heading text="Zoek jouw voetbalschool" type="thin"/>
      </Hero>
      <Row styles={[styleSheet.row]}>
        <Column breakpoints={{ [TABLET_LANDSCAPE]: 4 }}>
          <Box styles={[styleSheet.box]}>
            <Heading text="Lex = CSS Guru" type="thin"/>
          </Box>
        </Column>
        <Column breakpoints={{ [TABLET_LANDSCAPE]: 4 }}>
          <Box styles={[styleSheet.box]}>
            test2
          </Box>
        </Column>
        <Column breakpoints={{ [TABLET_LANDSCAPE]: 4 }}>
          <Box styles={[styleSheet.box]}>
            test3
          </Box>
        </Column>
      </Row>
      <Row>
        <Column breakpoints={{ [TABLET_LANDSCAPE]: 6 }}>
          <img className={css(styleSheet.promoImage)} src="/img/jumping_girls.svg" alt="Jumping Girls"/>
        </Column>
        <Column breakpoints={{ [TABLET_LANDSCAPE]: 6 }}>
          <div className={(css(styleSheet.promo))}>
            <div>
              <div className={css(styleSheet.promoHeader)}>
                <Heading text="De beste voetbalscholen" type="bold"/>
              </div>
              <p className={(css(styleSheet.promoText))}>
                Alle type voetbalscholen & academies snel geindexeerd voor uw gemak
              </p>
              <Button text="Bekijk alle scholen" type="primary"/>
            </div>
          </div>
        </Column>
      </Row>
      <Row>
        <Column breakpoints={{ [TABLET_LANDSCAPE]: 6 }}>
          <div className={(css(styleSheet.promo))}>
            <div>
              <div className={css(styleSheet.promoHeader)}>
                <Heading text="Gepersonaliseerd voor U" type="bold"/>
              </div>
              <p className={(css(styleSheet.promoText))}>
                De voetbalscholen worden op een tal van manieren voor u gesorteerd, waardoor u
                alleen het allerbeste krijgt.
              </p>
              <Button text="Maak een account" type="primary"/>
            </div>
          </div>
        </Column>
        <Column breakpoints={{ [TABLET_LANDSCAPE]: 6 }}>
          <img className={css(styleSheet.promoImage)} src="/img/computer.svg" alt="PC Table"/>
        </Column>
      </Row>
    </>
  );
};
