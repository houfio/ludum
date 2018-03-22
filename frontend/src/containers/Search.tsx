import * as React from 'react';
import { Component } from 'react';
import * as queryString from 'query-string';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { push } from 'react-router-redux';
import { academy } from '../modules/academy';
import { Input } from '../components/form/Input';
import { handle } from '../utils/handle';
import { Hero } from '../components/Hero';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { TABLET_LANDSCAPE } from '../constants';
import { Container } from '../components/Container';
import { SearchResult } from '../components/SearchResult';
import { Heading } from '../components/Heading';

type Form = {
  city: string
}

const mapStateToProps = (state: State) => ({
  location: state.router.location,
  results: state.academy.results
});

const getActionCreators = () => ({
  push,
  searchAcademies: academy.searchAcademies,
  clearResults: academy.clearResults
});

const { props, connect } = withProps<{}, InjectedFormProps>()(mapStateToProps, getActionCreators, state => ({
  initialValues: queryString.parse(state.location!.search)
}));

export const Search = connect(reduxForm<Form, typeof props>({
  form: 'search_results',
  onSubmit: (values, _, props) => {
    props.push(`/search?city=${values.city}`);
  }
})(class extends Component<typeof props> {
  public componentDidMount() {
    const { searchAcademies } = this.props;

    const city = this.getTargetCity();

    searchAcademies({ city });
  }

  public componentWillUnmount() {
    const { clearResults } = this.props;

    clearResults();
  }

  public componentWillReceiveProps(next: typeof props) {
    const { location } = this.props;
    const { searchAcademies } = this.props;
    const { location: nextLocation } = next;

    if (!location || !nextLocation) {
      return;
    }

    if (location.search !== nextLocation.search) {
      const city = this.getTargetCity(next);

      searchAcademies({ city });
    }
  }

  public render() {
    const { handleSubmit } = this.props;
    const { results } = this.props;
    const { push } = this.props;

    const city = this.getTargetCity();

    if (!city) {
      push('/');

      return false;
    }

    const styleSheet = StyleSheet.create({
      hero: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '5rem'
      },
      heading: {
        marginRight: '1rem'
      },
      container: {
        marginBottom: '5rem'
      }
    });

    return (
      <>
        <Hero styles={[styleSheet.hero]}>
          <Heading text="Zoeken in " type="bold" styles={[styleSheet.heading]}/>
          <form onSubmit={handleSubmit}>
            <Field name="city" type="text" placeholder="Eindhoven" component={Input}/>
          </form>
        </Hero>
        <Container styles={[styleSheet.container]}>
          <Row>
            <Column breakpoints={{ [TABLET_LANDSCAPE]: 3 }}>
              <Heading text="waardering" type="bold"/>
              <Heading text="leeftijd" type="bold"/>
              <Heading text="positie" type="bold"/>
              <Heading text="leerlingen" type="bold"/>
            </Column>
            <Column breakpoints={{ [TABLET_LANDSCAPE]: 9 }}>
              {results.map(result => (
                <SearchResult key={result.id} academy={result} onClick={handle(push, `/academy/${result.id}`)}/>
              ))}
            </Column>
          </Row>
        </Container>
      </>
    );
  }

  private getTargetCity = (props = this.props) => {
    const { location } = props;

    if (!location) {
      return;
    }

    const params = queryString.parse(location.search);

    return params.city;
  };
} as any) as any);
