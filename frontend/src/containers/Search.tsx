import * as React from 'react';
import { Component } from 'react';
import * as queryString from 'query-string';
import { stringify } from 'query-string';
import { Field, InjectedFormProps, reduxForm, submit } from 'redux-form';
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
import { Select } from '../components/form/Select';

type Form = {
  city: string,
  age?: string,
  position?: string,
  member_count?: string
}

const mapStateToProps = (state: State) => ({
  location: state.router.location,
  results: state.academy.results,
  positions: state.content.positions
});

const getActionCreators = () => ({
  push,
  searchAcademies: academy.searchAcademies,
  clearResults: academy.clearResults,
  submit
});

const { props, connect } = withProps<{}, InjectedFormProps>()(mapStateToProps, getActionCreators, state => ({
  initialValues: queryString.parse(state.location!.search)
}));

export const Search = connect(reduxForm<Form, typeof props>({
  form: 'search_results',
  onSubmit: (values, _, props) => {
    props.push(`/search?${stringify(values)}`);
  }
})(class extends Component<typeof props> {
  public componentDidMount() {
    const { searchAcademies } = this.props;

    searchAcademies(queryString.parse(location.search));
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
      searchAcademies(queryString.parse(nextLocation.search));
    }
  }

  public render() {
    const { handleSubmit } = this.props;
    const { results, positions } = this.props;
    const { push, submit } = this.props;

    const params = queryString.parse(location.search);

    if (!params.city) {
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
      },
      filter: {
        marginBottom: '1rem',
        marginLeft: '-1rem',
        width: '100%'
      }
    });

    const onChange = handle(setTimeout, handle(submit, 'search_results'));

    return (
      <form onSubmit={handleSubmit}>
        <Hero styles={[styleSheet.hero]}>
          <Heading text="Zoeken in " type="bold" styles={[styleSheet.heading]}/>
          <Field name="city" type="text" placeholder="Eindhoven" component={Input}/>
        </Hero>
        <Container styles={[styleSheet.container]}>
          <Row>
            <Column breakpoints={{ [TABLET_LANDSCAPE]: 3 }}>
              <Heading text="leeftijd" type="bold"/>
              <Field
                name="age"
                type="number"
                component={Input}
                styles={[styleSheet.filter]}
                onChange={onChange}
              />
              <Heading text="positie" type="bold"/>
              <Field
                name="position"
                component={Select}
                onChange={onChange}
                styles={[styleSheet.filter]}
              >
                <option/>
                {positions && positions.map(position => (
                  <option key={position.id} value={position.id}>{position.name}</option>
                ))}
              </Field>
              <Heading text="leerlingen" type="bold"/>
              <Field
                name="member_count"
                component={Select}
                onChange={onChange}
                styles={[styleSheet.filter]}
              >
                <option/>
                <option value="0">&lt;5</option>
                <option value="1">5-9</option>
                <option value="2">10-24</option>
                <option value="3">24-49</option>
                <option value="4">&gt;50</option>
              </Field>
            </Column>
            <Column breakpoints={{ [TABLET_LANDSCAPE]: 9 }}>
              {results.map(result => (
                <SearchResult key={result.id} academy={result} onClick={handle(push, `/academy/${result.id}`)}/>
              ))}
            </Column>
          </Row>
        </Container>
      </form>
    );
  }
} as any) as any);
