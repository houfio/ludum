import * as React from 'react';
import { Component } from 'react';
import * as queryString from 'query-string';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { push } from 'react-router-redux';
import { academy } from '../modules/academy';
import { Input } from '../components/form/Input';
import { handle } from '../utils/handle';

type Form = {
  query: string
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

const { props, connect } = withProps<{}, InjectedFormProps>()(mapStateToProps, getActionCreators);

export const Search = connect(reduxForm<Form, typeof props>({
  form: 'search',
  onSubmit: values => console.log(values)
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

  public render() {
    const { handleSubmit } = this.props;
    const { results } = this.props;
    const { push } = this.props;

    const city = this.getTargetCity();

    if (!city) {
      push('/');

      return false;
    }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <Field name="query" type="text" placeholder="Eindhoven" component={Input}/>
        </form>
        {results.map(result => (
          <div key={result.id} onClick={handle(push, `/academy/${result.id}`)}>
            {result.name}
          </div>
        ))}
      </>
    );
  }

  private getTargetCity = () => {
    const { location } = this.props;

    if (!location) {
      return;
    }

    const params = queryString.parse(location.search);

    return params.city;
  };
} as any) as any);
