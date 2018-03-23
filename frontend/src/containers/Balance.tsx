import * as React from 'react';
import { Component } from 'react';
import { push } from 'react-router-redux';
import { css, StyleSheet } from 'aphrodite/no-important';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { auth } from '../modules/auth';
import { Hero } from '../components/Hero';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { Button } from '../components/form/Button';
import { Input } from '../components/form/Input';
import { createApiRequest } from '../utils/createApiRequest';

type Form = {
  amount: string
}

const mapStateToProps = (state: State) => ({
  token: state.auth.token,
  user: state.auth.user
});

const getActionCreators = () => ({
  push,
  getUser: auth.getUser,
  clearUser: auth.clearUser,
});

const { props, connect } = withProps<{}, InjectedFormProps>()(mapStateToProps, getActionCreators);

export const Balance = connect(reduxForm<Form, typeof props>({
  form: 'balance',
  onSubmit: (values, _, props) => {
    createApiRequest<string>('post', 'payments/top-up', values, { token: props.token! }).then(result => {
      window.location.href = result.data!;
    });
  }
})(class extends Component<typeof props> {
  public componentDidMount() {
    const { token } = this.props;
    const { push, getUser } = this.props;

    if (!token) {
      push('/login');

      return;
    }

    getUser({ token: token! });
  }

  public componentWillUnmount() {
    const { clearUser } = this.props;

    clearUser();
  }

  public render() {
    const { handleSubmit } = this.props;
    const { user } = this.props;

    const styleSheet = StyleSheet.create({
      balance: {
        position: 'absolute',
        color: '#68B34C',
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: '5rem',
        marginTop: 'calc(16rem - 2vw)'
      },
      heading: {
        lineHeight: '1',
        fontSize: '3rem'
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        maxWidth: '80%',
        margin: '3rem auto'
      },
      formItem: {
        width: '100%',
        marginBottom: '1rem'
      }
    });

    return (
      <>
        <Hero>
          <Container>
            <Heading text="balans" type="bold"/>
            <div>
              W-Why me!? W-What did I do!? Sorry, but it's not for sale. Yet... Why can't we have a normal,
              straightforward killing once in awhile in this country!? If you wish to hang yourself,
              Mr. Wright, you're welcome to, but not inside my courtroom. Oui!
              W'iz you monsieur...everything feels right! Who are you?
            </div>
          </Container>
          <div className={css(styleSheet.balance)}>
            {user && (
              <Heading text={`€${user.balance}`} type="bold" styles={[styleSheet.heading]}/>
            )}
          </div>
        </Hero>
        <form onSubmit={handleSubmit} className={css(styleSheet.form)}>
          <Field name="amount" type="number" component={Input} styles={[styleSheet.formItem]}/>
          <Button text="opwaarderen" htmlType="submit" styles={[styleSheet.formItem]}/>
        </form>
      </>
    );
  }
} as any) as any);
