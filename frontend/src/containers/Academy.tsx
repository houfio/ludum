import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { academy } from '../modules/academy';

type Params = {
  id: string
}

const mapStateToProps = (state: State) => ({
  current: state.academy.current
});

const getActionCreators = () => ({
  getAcademy: academy.getAcademy,
  clearCurrent: academy.clearCurrent
});

const { props, connect } = withProps<{}, RouteComponentProps<Params>>()(mapStateToProps, getActionCreators);

export const Academy = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { getAcademy } = this.props;

    if (isNaN(+id)) {
      return;
    }

    getAcademy({ id: +id });
  }

  public componentWillUnmount() {
    const { clearCurrent } = this.props;

    clearCurrent();
  }

  public render() {
    const { current } = this.props;

    if (!current) {
      return false;
    }

    return (
      <div>
        {current.name}
      </div>
    );
  }
});
