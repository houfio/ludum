import * as React from 'react';
import { CSSProperties } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

type Props = {
  rating: number,
  styles?: (CSSProperties | false)[]
}

export const Rating = ({ rating, styles = [] }: Props) => {
  const styleSheet = StyleSheet.create({
    star: {
      width: '2rem',
      height: '2rem'
    }
  });

  return (
    <div className={css(styles)}>
      {[1, 2, 3, 4, 5].map(i => (
        <img key={i} src={`/img/${i <= rating ? '' : 'no'}star.svg`} className={css(styleSheet.star)}/>
      ))}
    </div>
  );
};
