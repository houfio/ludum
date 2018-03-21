import * as React from 'react';
import { Component } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { Hero } from '../components/Hero';
import { Heading } from '../components/Heading';
import { Input } from '../components/form/Input';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { forBreakpoint } from '../utils/forBreakpoint';
import { TABLET_LANDSCAPE } from '../constants';

const { props, connect } = withProps<{}, InjectedFormProps>()();

export const Login = connect(reduxForm<{}, typeof props>({
  form: 'login',
  onSubmit: values => console.log(values)
})(class extends Component<typeof props> {
  public render() {
    const { handleSubmit } = this.props;

    const styleSheet = StyleSheet.create({
      hero: {
        marginBottom: '10rem'
      },
      form: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        margin: '5rem 0 -21rem 0',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, .75)'
      },
      formItem: {
        margin: '.5rem'
      },
      heading: {
        display: 'inline-flex'
      },
      image: {
        display: 'none',
        position: 'absolute',
        height: '12rem',
        left: '-15rem',
        top: '-2rem',
        ...forBreakpoint(TABLET_LANDSCAPE, {
          display: 'block'
        })
      }
    });

    return (
      <Hero styles={[styleSheet.hero]}>
        <Container>
          <Heading text="inloggen" type="bold" styles={[styleSheet.heading]}/>
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
          Nog geen account? Registreer je hier!
          <img src="/img/sliding_guy.svg" className={css(styleSheet.image)}/>
        </form>
      </Hero>
    );
  }
} as any));
