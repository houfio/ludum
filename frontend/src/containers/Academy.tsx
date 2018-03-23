import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { academy } from '../modules/academy';
import { Hero } from '../components/Hero';
import { Heading } from '../components/Heading';
import { Container } from '../components/Container';
import { Box } from '../components/Box';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { DESKTOP, TABLET_LANDSCAPE } from '../constants';
import { Rating } from '../components/Rating';
import { Button } from '../components/form/Button';

type Params = {
  id: string
}

const mapStateToProps = (state: State) => ({
  current: state.academy.current
});

const getActionCreators = () => ({
  getAcademy: academy.getAcademy,
  clearCurrent: academy.clearCurrent
});

const { props, connect } = withProps<{}, RouteComponentProps<Params>>()(mapStateToProps, getActionCreators);

export const Academy = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { getAcademy } = this.props;

    if (isNaN(+id)) {
      return;
    }

    getAcademy({ id: +id });
  }

  public componentWillUnmount() {
    const { clearCurrent } = this.props;

    clearCurrent();
  }

  public render() {
    const { current } = this.props;

    if (!current) {
      return false;
    }

    const styleSheet = StyleSheet.create({
      container: {
        marginTop: '36rem',
        marginBottom: '4rem'
      },
      description: {
        display: 'block',
        maxWidth: '600px'
      },
      review: {
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      },
      section: {
        marginBottom: '10rem'
      }
    });

    return (
      <>
        <Hero image={current.header_image}/>
        <Container styles={[styleSheet.container]}>
          <Heading text={current.name} type="bold"/>
          <span className={css(styleSheet.description)}>{current.description}</span>
        </Container>
        <Hero narrow={true} styles={[styleSheet.section]}>
          <Container>
            <Row>
              {current.reviews.map(review => (
                <Column key={review.id} breakpoints={{ [TABLET_LANDSCAPE]: 6, [DESKTOP]: 3 }}>
                  <Box styles={[styleSheet.review]}>
                    <div>
                      <Heading text={review.title} type="thin"/>
                      {review.review}
                    </div>
                    <div>
                      {review.first_name} {review.last_name}
                      <Rating rating={review.stars}/>
                    </div>
                  </Box>
                </Column>
              ))}
            </Row>
          </Container>
        </Hero>
        <Hero inverse={true} narrow={true} styles={[styleSheet.section]}>
          <Container>
            <Row>
              {current.subscriptions.map(subscription => (
                <Column key={subscription.id} breakpoints={{ [TABLET_LANDSCAPE]: 6, [DESKTOP]: 3 }}>
                  <Box styles={[styleSheet.review]}>
                    <div>
                      <Heading text={subscription.title} type="thin"/>
                      {subscription.description}
                    </div>
                    <div>
                      <Heading text={`€${subscription.price} p/m`} type="bold"/>
                      <Button text="Abonneren"/>
                    </div>
                  </Box>
                </Column>
              ))}
            </Row>
          </Container>
        </Hero>
      </>
    );
  }
});
