import * as React from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import * as ReactMarkdown from 'react-markdown';

import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { Box } from '../components/Box';
import { Heading } from '../components/Heading';
import { BIG_DESKTOP, DESKTOP, TABLET_LANDSCAPE, TABLET_PORTRAIT } from '../constants';
import { Hero } from '../components/Hero';
import { Container } from '../components/Container';
import { Component } from 'react';
import { withProps } from '../utils/withProps';
import { push } from 'react-router-redux';
import { State } from '../types';
import { subscriptions } from '../modules/subscription';
import { Button } from '../components/form/Button';

const mapStateToProps = (state: State) => ({
  token: state.auth.token,
  scout: state.subscriptions.scout
});

const getActionCreators = () => ({
  push,
  getScoutSubscriptions: subscriptions.getScoutSubscriptions
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Scout = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { getScoutSubscriptions } = this.props;

    getScoutSubscriptions();
  }

  public render() {
    const { scout, token } = this.props;

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
      },
      button: {
        width: '85%'
      }
    });

    const breakpointsFirst = {
      [TABLET_PORTRAIT]: 11,
      [TABLET_LANDSCAPE]: { size: 9, offset: 1 },
      [DESKTOP]: { size: 4.5, offset: 1.5 },
      [BIG_DESKTOP]: { size: 3, offset: 1.5 }
    };

    const breakpointsSecond = {
      [TABLET_PORTRAIT]: 11,
      [TABLET_LANDSCAPE]: 9,
      [DESKTOP]: 4.5,
      [BIG_DESKTOP]: 3
    };

    return (
      <>
        <Hero>
          <Container>
            <Heading text="Scout" type="bold"/>
            <div>
              Bij Ludum kunt u zich aanmelden als scout, dat kan al vanaf &euro;3,99.
              U krijgt uitgebreid toegang tot ons zoeksysteem waarmee u leden kunt zoeken.
              Deze leden kunt u vervolgens contacteren voor een vast
              laag bedrag, dat kan al vanaf &euro;0,60 per bericht.
              U kunt veel informatie inzien van onze leden,
              zodat u alleen berichten verstuurd naar personen die binnen uw zoekcriteria passen.
            </div>
          </Container>
        </Hero>
        <Row styles={[styleSheet.boxes]}>
          {scout && scout.map((subscription, index) => (
            <Column
              key={subscription.id}
              breakpoints={index === 0 ? breakpointsFirst : breakpointsSecond}
            >
              <Box styles={[styleSheet.box]}>
                <Heading text={subscription.title} type="bold"/>
                <div>&euro;{subscription.price} p/m</div>
                <ReactMarkdown source={subscription.description} escapeHtml={true}/>
                {token ? (
                  <Button text="Abonneer" type="primary" styles={[styleSheet.button]}/>
                ) : (
                  <Button text="Login" type="primary" styles={[styleSheet.button]}/>
                )}
              </Box>
            </Column>
          ))}
        </Row>
      </>
    );
  }
});
