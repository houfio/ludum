import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { academy } from '../modules/academy';
import { Hero } from '../components/Hero';
import { Heading } from '../components/Heading';
import { Container } from '../components/Container';

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
      heading: {
        textShadow: '0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)'
      },
      container: {
        margin: '38rem 0 4rem 0'
      }
    });

    return (
      <>
        <Hero image={current.header_image}>
          <Heading text={current.name} type="bold" styles={[Boolean(current.header_image) && styleSheet.heading]}/>
        </Hero>
        <Container styles={[styleSheet.container]}>
          {current.description}
        </Container>
      </>
    );
  }
});
