import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { Hero } from '../components/Hero';
import { withProps } from '../utils/withProps';
import { State } from '../types';
import { push } from 'react-router-redux';
import { auth } from '../modules/auth';
import { Heading } from '../components/Heading';
import { Input } from '../components/form/Input';

type Form = {
  email: string,
  receive_emails: boolean,
  phone_number: string,
  zip_code: string,
  house_number: string,
  receive_newsletter: boolean,
  team: string
};

const mapStateToProps = (state: State) => ({
  token: state.auth.token,
  user: state.auth.user
});

const getActionCreators = () => ({
  push,
  getUser: auth.getUser,
  clearUser: auth.clearUser
});

const { props, connect } = withProps<{}, InjectedFormProps>()(mapStateToProps, getActionCreators);

export const Profile = connect(reduxForm<Form, typeof props>({
  form: 'profile',
  onSubmit: values => {
    console.log(values);
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
      avatar: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 'calc(10rem - 2vw)'
      },
      image: {
        width: '10rem',
        maxWidth: '80%'
      },
      name: {
        position: 'absolute',
        top: '-4rem'
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
      }
    });

    return (
      <Hero inverse={true}>
        <div className={css(styleSheet.avatar)}>
          {user && (
            <Heading text={`${user.first_name} ${user.last_name}`} type="bold" styles={[styleSheet.name]}/>
          )}
          <img src="/img/avatar.svg" className={css(styleSheet.image)}/>
        </div>
        <form className={css(styleSheet.form)} onSubmit={handleSubmit}>
          <Field
            name="email"
            type="email"
            placeholder="email adres"
            component={Input}
            styles={[styleSheet.formItem]}
          />
          <Field
            name="phone"
            type="checkbox"
            placeholder="telefoonnummer"
            component="input"
            styles={[styleSheet.formItem]}
          />
        </form>
      </Hero>
    );
  }
} as any) as any);