import { StyleDeclaration } from 'aphrodite';

import { BREAKPOINTS } from '../constants';

export const forBreakpoint = (breakpoint: keyof typeof BREAKPOINTS, style: StyleDeclaration) => {
  let size = BREAKPOINTS[breakpoint];

  if (size !== '0') {
    return {
      ['@media (min-width: ' + size + ')']: style
    };
  }

  return style;
};
