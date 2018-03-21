import { CSSProperties } from 'react';
import { StyleDeclaration } from 'aphrodite/no-important';

import { forBreakpoint } from './forBreakpoint';
import { BREAKPOINTS } from '../constants';

export const forBreakpoints =
  <T, B extends keyof typeof BREAKPOINTS>(breakpoints: { [N in B]?: T },
                                          getProperties: (value: T, breakpoint: B) => CSSProperties) => {
    let properties: StyleDeclaration = {};

    for (let breakpoint in breakpoints) {
      if (breakpoints.hasOwnProperty(breakpoint)) {
        properties = {
          ...properties,
          ...forBreakpoint(breakpoint, getProperties(breakpoints[breakpoint] as T, breakpoint))
        };
      }
    }

    return properties;
  };
