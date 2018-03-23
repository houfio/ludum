import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { Field, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

import { Heading } from '../components/Heading';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { BIG_DESKTOP, DESKTOP, TABLET_LANDSCAPE, TABLET_PORTRAIT } from '../constants';
import { Button } from '../components/form/Button';
import { Hero } from '../components/Hero';
import { Box } from '../components/Box';
import { Input } from '../components/form/Input';
import { Container } from '../components/Container';

type Form = {
  city: string
}

export const Home = reduxForm<Form>({
  form: 'search',
  onSubmit: (values, dispatch) => {
    dispatch(push(`/search?city=${values.city}`));
  }
})(({ handleSubmit }) => {
  const styleSheet = StyleSheet.create({
    heroText: {
      marginBottom: '2rem'
    },
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
    },
    promos: {
      marginTop: '8rem'
    },
    promoText: {
      display: 'flex',
      alignItems: 'center'
    },
    promoButton: {
      marginTop: '.5rem'
    },
    promoImage: {
      margin: '4rem'
    },
    inputWidth: {
      maxWidth: '85%'
    }
  });

  const breakpointsFirst = {
    [TABLET_PORTRAIT]: 6,
    [TABLET_LANDSCAPE]: { size: 5, offset: 1 },
    [DESKTOP]: { size: 4, offset: 2 },
    [BIG_DESKTOP]: { size: 3, offset: 3 }
  };

  const breakpointsSecond = {
    [TABLET_PORTRAIT]: 6,
    [TABLET_LANDSCAPE]: 5,
    [DESKTOP]: 4,
    [BIG_DESKTOP]: 3
  };

  return (
    <>
      <Hero>
        <Container>
          <Heading text="Vind de perfecte voetbalschool in:" type="bold" styles={[styleSheet.heroText]}/>
          <form onSubmit={handleSubmit}>
            <Field styles={styleSheet.inputWidth} name="city" type="text" placeholder="Eindhoven" component={Input}/>
          </form>
        </Container>
      </Hero>
      <Row styles={[styleSheet.boxes]}>
        <Column breakpoints={breakpointsFirst}>
          <Box styles={[styleSheet.box]}>
            <img src="/img/certificate.svg" className={css(styleSheet.boxImage)}/>
            <Heading text="Verbetering" type="thin"/>
            <p>Ik heb geen idee wat ik hier neer moet zetten</p>
          </Box>
        </Column>
        <Column breakpoints={breakpointsSecond}>
          <Box styles={[styleSheet.box]}>
            <img src="/img/medal.svg" className={css(styleSheet.boxImage)}/>
            <Heading text="Snel & Vertrouwd" type="thin"/>
            <p>Hallo dokter, wat kan ik doen aan crippling depression?</p>
          </Box>
        </Column>
      </Row>
      <Row styles={[styleSheet.promos]}>
        <Column breakpoints={breakpointsFirst}>
          <div className={css(styleSheet.promoImage)}>
            <img src="/img/jumping_girls.svg"/>
          </div>
        </Column>
        <Column breakpoints={breakpointsSecond} styles={[styleSheet.promoText]}>
          <div className={css(styleSheet.promoImage)}>
            <Heading text="De beste voetbalscholen" type="bold"/>
            <p>Alle type voetbalscholen &amp; academies snel geindexeerd voor jouw gemak</p>
            <Button text="Bekijk alle scholen" type="primary" styles={[styleSheet.promoButton]}/>
          </div>
        </Column>
        <Column breakpoints={breakpointsFirst} styles={[styleSheet.promoText]}>
          <div className={css(styleSheet.promoImage)}>
            <Heading text="Gepersonaliseerd voor jou" type="bold"/>
            <p>
              De voetbalscholen worden op een tal van manieren voor jou gesorteerd,
              waardoor jij alleen het allerbeste krijgt.
            </p>
            <Button text="Bekijk alle scholen" type="primary" styles={[styleSheet.promoButton]}/>
          </div>
        </Column>
        <Column breakpoints={breakpointsSecond}>
          <div className={css(styleSheet.promoImage)}>
            <img src="/img/computer.svg"/>
          </div>
        </Column>
        <Column breakpoints={breakpointsFirst}>
          <div className={css(styleSheet.promoImage)}>
            <img src="/img/scout.svg"/>
          </div>
        </Column>
        <Column breakpoints={breakpointsSecond} styles={[styleSheet.promoText]}>
          <div className={css(styleSheet.promoImage)}>
            <Heading text="Perfect voor scouts" type="bold"/>
            <p>Hier mogen wij het eigenlijk niet over hebben, want het is best raar eigenlijk.</p>
            <Button
              text="Zie de mogelijkheden"
              type="primary"
              styles={[styleSheet.promoButton]}
            />
          </div>
        </Column>
      </Row>
    </>
  );
});
