import { createModule } from '../utils/createModule';
import { createApiRequest } from '../utils/createApiRequest';
import { Position } from '../api/Position';

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
    ),
    getPositions: createAction('GET_POSITIONS')(
      () => ({
        promise: createApiRequest<Position[]>('get', 'positions'),
        queue: 'load'
      }),
      action => ({
        positions: action.data
      })
    )
  })
);
