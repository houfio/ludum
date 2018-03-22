import * as React from 'react';
import { Component } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { Hero } from '../components/Hero';
import { Heading } from '../components/Heading';
import { Input } from '../components/form/Input';
import { Button } from '../components/form/Button';
import { Container } from '../components/Container';
import { forBreakpoint } from '../utils/forBreakpoint';
import { TABLET_LANDSCAPE } from '../constants';
import { auth } from '../modules/auth';
import { Link } from '../components/Link';

type Form = {
  email: string,
  password: string
}

const { props, connect } = withProps<{}, InjectedFormProps>()();

export const Login = connect(reduxForm<Form, typeof props>({
  form: 'login',
  onSubmit: (values, dispatch) => {
    dispatch(auth.login({ email: values.email!, password: values.password! }));
  }
})(class extends Component<typeof props> {
  public render() {
    const { handleSubmit } = this.props;

    const styleSheet = StyleSheet.create({
      hero: {
        marginBottom: '10rem'
      },
      container: {
        marginBottom: '4rem'
      },
      form: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        margin: '5rem 0 -21rem 0',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, .75)',
        maxWidth: '80%'
      },
      formItem: {
        margin: '.5rem'
      },
      image: {
        display: 'none',
        position: 'absolute',
        height: '12rem',
        left: '-20vw',
        top: '-2rem',
        ...forBreakpoint(TABLET_LANDSCAPE, {
          display: 'block'
        })
      }
    });

    return (
      <Hero styles={[styleSheet.hero]}>
        <Container styles={[styleSheet.container]}>
          <Heading text="inloggen" type="bold"/>
          <div>
            I see. So our trusty Phoenix Wright is back with us now, is he?
            Who are you? At least hear the case before you decide on the outcome, Your Honor!
            Wait, hold on. Laaaaaaryyyy! It was you!? YOU'RE the one who wrote my Steel Samurai autograph!?
            (...she says with a silly smile plastered on her face...) So do you know anything about it that might help?
            Order Order! Mr Godot! Can you explain this?
          </div>
        </Container>
        <form className={css(styleSheet.form)} onSubmit={handleSubmit}>
          <Field
            name="email"
            type="email"
            placeholder="email adres"
            component={Input}
            styles={[styleSheet.formItem]}
          />
          <Field
            name="password"
            type="password"
            placeholder="wachtwoord"
            component={Input}
            styles={[styleSheet.formItem]}
          />
          <Button text="inloggen" htmlType="submit" styles={[styleSheet.formItem]}/>
          <Link text="Nog geen account? Registreer je hier!" target="/register"/>
          <img src="/img/sliding_guy.svg" className={css(styleSheet.image)}/>
        </form>
      </Hero>
    );
  }
} as any));
