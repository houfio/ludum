import * as React from 'react';
import { Component } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite/no-important';
import { push } from 'react-router-redux';

import { withProps } from '../utils/withProps';
import { Hero } from '../components/Hero';
import { Heading } from '../components/Heading';
import { Input } from '../components/form/Input';
import { Button } from '../components/form/Button';
import { Container } from '../components/Container';
import { forBreakpoint } from '../utils/forBreakpoint';
import { TABLET_LANDSCAPE } from '../constants';
import { Link } from '../components/Link';
import { auth } from '../modules/auth';

type Form = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  telephone: string
}

const { props, connect } = withProps<{}, InjectedFormProps>()();

export const Register = connect(reduxForm<Form, typeof props>({
  form: 'register',
  onSubmit: (values, dispatch) => {
    const promise = dispatch(auth.register(values as Required<Form>)) as any as Promise<any>;

    promise.then(() => {
      dispatch(push('/profile'))
    });
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
        right: '-20vw',
        top: '8rem',
        ...forBreakpoint(TABLET_LANDSCAPE, {
          display: 'block'
        })
      }
    });

    return (
      <Hero inverse={true} styles={[styleSheet.hero]}>
        <Container styles={[styleSheet.container]}>
          <Heading text="registreren" type="bold"/>
          <div>
            I have no real interest in the perceived worth of other people. As for my own worth,
            that is something only I can determine for myself. Well, maybe it was a typo!
            It might have said, 'Spaghetti Festival'. What do you think? Well done, Apollo.
            It almost as if you figured it out yourself. There you are! Where have you been?
            My sister's trial is tomorrow! Very well, witness. Please describe the incident to us.
            It's OK. Just give back the necklace.
          </div>
        </Container>
        <form className={css(styleSheet.form)} onSubmit={handleSubmit}>
          <Field
            name="first_name"
            type="text"
            placeholder="voornaam"
            component={Input}
            styles={[styleSheet.formItem]}
          />
          <Field
            name="last_name"
            type="text"
            placeholder="achternaam"
            component={Input}
            styles={[styleSheet.formItem]}
          />
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
          <Button text="registreren" htmlType="submit" styles={[styleSheet.formItem]}/>
          <Link text="Al een account? Log je hier in!" target="/login"/>
          <img src="/img/proud_guy.svg" className={css(styleSheet.image)}/>
        </form>
      </Hero>
    );
  }
} as any));
