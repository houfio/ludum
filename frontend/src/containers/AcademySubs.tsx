import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { academy } from '../modules/academy';
import { Heading } from '../components/Heading';
import { Container } from '../components/Container';

type Params = {
  id: string
}

const mapStateToProps = (state: State) => ({
  token: state.auth.token,
  subscriptions: state.academy.subscriptions
});

const getActionCreators = () => ({
  getAcademySubscriptions: academy.getAcademySubscriptions,
  clearAcademySubscriptions: academy.clearAcademySubscriptions
});

const { props, connect } = withProps<{}, RouteComponentProps<Params>>()(mapStateToProps, getActionCreators);

export const AcademySubs = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { token } = this.props;
    const { getAcademySubscriptions } = this.props;

    if (isNaN(+id) || !token) {
      return;
    }

    getAcademySubscriptions({ id: +id, token });
  }

  public componentWillUnmount() {
    const { clearAcademySubscriptions } = this.props;

    clearAcademySubscriptions();
  }

  public render() {
    const { subscriptions } = this.props;

    const styleSheet = StyleSheet.create({
      box: {
        marginTop: '2rem'
      },
      item: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        border: '2px solid #EBEBEB',
        borderRadius: '.5rem',
        marginBottom: '1rem'
      },
      image: {
        width: '4rem',
        marginRight: '1rem'
      }
    });

    return (
      <Container>
        {subscriptions.map(subscription => (
          <div key={subscription.id} className={css(styleSheet.box)}>
            <Heading text={subscription.title} type="bold"/>
            {subscription.subscribers.length ? subscription.subscribers.map(subscriber => (
              <div key={subscriber.id}>
                <div className={css(styleSheet.item)}>
                  <img src="/img/avatar.svg" className={css(styleSheet.image)}/>
                  {subscriber.first_name} {subscriber.last_name}
                </div>
              </div>
            )) : (
              <span>Geen abonnees</span>
            )}
          </div>
        ))}
      </Container>
    );
  }
});
