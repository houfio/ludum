import * as React from 'react';
import { RouteComponentProps } from 'react-router';
// import { StyleSheet } from 'aphrodite/no-important';

type Props = RouteComponentProps<{ id: number }>;

export const Academy = ({ match: { params: { id } } }: Props) => {
  /*
  const styleSheet = StyleSheet.create({
  });
  */

  return (
    <>
     Dit is academy: {id}
    </>
  );
};
