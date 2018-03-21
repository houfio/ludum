import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { Logo } from './Logo';

export const Navigation = () => {
  const styleSheet = StyleSheet.create({
    navigation: {
      backgroundColor: '#68B34C',
      padding: '2rem'
    }
  });

  return (
    <nav className={css(styleSheet.navigation)}>
      <Logo/>
    </nav>
  );
};
