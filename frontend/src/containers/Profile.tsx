import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { Field, initialize, InjectedFormProps, reduxForm } from 'redux-form';

import { Hero } from '../components/Hero';
import { withProps } from '../utils/withProps';
import { State } from '../types';
import { push } from 'react-router-redux';
import { auth } from '../modules/auth';
import { Heading } from '../components/Heading';
import { Input } from '../components/form/Input';
import { Container } from '../components/Container';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { TABLET_LANDSCAPE } from '../constants';
import { Link } from '../components/Link';
import { Select } from '../components/form/Select';

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
  user: state.auth.user,
  positions: state.content.positions
});

const getActionCreators = () => ({
  push,
  getUser: auth.getUser,
  clearUser: auth.clearUser,
  initialize
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
    const { push, getUser, initialize } = this.props;

    if (!token) {
      push('/login');

      return;
    }

    const promise = getUser({ token: token! }) as any as Promise<any>;

    promise.then(result => {
      initialize('profile', result);
    });
  }

  public componentWillUnmount() {
    const { clearUser } = this.props;

    clearUser();
  }

  public render() {
    const { handleSubmit } = this.props;
    const { user, positions } = this.props;

    const styleSheet = StyleSheet.create({
      hero: {
        marginBottom: '4rem',
      },
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
      underText: {
        marginTop: '-.5rem'
      },
      center: {
        display: 'flex',
        justifyContent: 'center'
      },
      container: {
        marginBottom: '4rem'
      },
      formItem: {
        margin: '.5rem',
        width: '100%'
      }
    });

    return (
      <>
        <Hero inverse={true} styles={[styleSheet.hero]}>
          <div className={css(styleSheet.avatar)}>
            {user && (
              <div className={css(styleSheet.name)}>
                <Heading text={`${user.first_name} ${user.last_name}`} type="bold" styles={[styleSheet.center]}/>
                <span className={css(styleSheet.center, styleSheet.underText)}>
                  <Link text="logout" target="/logout"/>
                  <span>&nbsp;|&nbsp;</span>
                  <Link text={`€${user.balance}`} target="/balance"/>
                </span>
              </div>
            )}
            <img src="/img/avatar.svg" className={css(styleSheet.image)}/>
          </div>
        </Hero>
        <Container styles={[styleSheet.container]}>
          <Row>
            <Column breakpoints={{ [TABLET_LANDSCAPE]: { size: 6, offset: 3 } }}>
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  type="email"
                  placeholder="email adres"
                  component={Input}
                  styles={[styleSheet.formItem]}
                />
                <Field
                  name="phone"
                  type="text"
                  placeholder="telefoonnummer"
                  component={Input}
                  styles={[styleSheet.formItem]}
                />
                <Field
                  name="team"
                  type="text"
                  placeholder="team"
                  component={Input}
                  styles={[styleSheet.formItem]}
                />
                <Field
                  name="position"
                  component={Select}
                  styles={[styleSheet.formItem]}
                >
                  <option/>
                  {positions && positions.map(position => (
                    <option key={position.id} value={position.id}>{position.name}</option>
                  ))}
                </Field>
              </form>
            </Column>
          </Row>
        </Container>
      </>
    );
  }
} as any) as any);