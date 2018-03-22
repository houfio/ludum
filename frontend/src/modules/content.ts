import { createModule } from '../utils/createModule';

export const content = createModule(
  'content',
  {
    ghostNav: false
  },
  createAction => ({
    setGhostNav: createAction<{ ghost: boolean }>('SET_GHOST_NAV')(
      payload => payload,
      action => ({
        ghostNav: action.ghost
      })
    )
  })
);
