import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { Logo } from './Logo';
import { Heading } from './Heading';
import { withProps } from '../utils/withProps';
import { State } from '../types';
import { Input } from './form/Input';
import { Container } from './Container';

const mapStateToProps = (state: State) => ({
  location: state.router.location
});

const { props, connect } = withProps()(mapStateToProps);

export const Footer = connect(class extends Component<typeof props> {
  public render() {
    const { location } = this.props;

    const styleSheet = StyleSheet.create({
      section: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      },
      background: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: -1
      },
      top: {
        padding: '12rem 0 calc(26rem - 100vw / 16) 0',
        marginBottom: '-13rem'
      },
      topBackground: {
        backgroundColor: '#A4D194',
        transform: 'skewY(-3deg)',
        transformOrigin: 'center right'
      },
      bottom: {
        padding: '8rem 0 2rem 0'
      },
      bottomBackground: {
        backgroundColor: '#68B34C',
        transform: 'skewY(3deg)',
        transformOrigin: 'center left'
      },
      heading: {
        marginBottom: '1rem'
      },
      description: {
        textAlign: 'center',
        maxWidth: '300px',
        marginBottom: '2rem'
      },
      inputWidth: {
        maxWidth: '85%'
      },
      center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    });

    return (
      <footer>
        {location && location.pathname === '/' && (
          <div className={css(styleSheet.section, styleSheet.top)}>
            <Container styles={[styleSheet.center]}>
              <div className={css(styleSheet.background, styleSheet.topBackground)}/>
              <Heading text="Jouw voetbalschool ook op ludum?" type="bold" styles={[styleSheet.heading]}/>
              <div className={css(styleSheet.description)}>
                Wil je jouw voetbalschool ook op ludum? Schrijf je hier in en wij nemen contact met je op!
              </div>
              <Input styles={[styleSheet.inputWidth] as any} placeholder="email adres" type="email"/>
            </Container>
          </div>
        )}
        <div className={css(styleSheet.section, styleSheet.bottom)}>
          <Container styles={[styleSheet.center]}>
            <div className={css(styleSheet.background, styleSheet.bottomBackground)}/>
            <Logo/>
          </Container>
        </div>
      </footer>
    );
  }
});
