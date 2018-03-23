import { createModule } from '../utils/createModule';
import { createApiRequest } from '../utils/createApiRequest';
import { ScoutSubscription } from '../api/ScoutSubscription';

export const subscriptions = createModule(
  'subscriptions',
  {
    scout: undefined
  },
  createAction => ({
    getScoutSubscriptions: createAction('GET_SCOUT_SUBSCRIPTIONS')(
      () => ({
        promise: createApiRequest<ScoutSubscription[]>('get', 'subscription/scout'),
        queue: 'load'
      }),
      action => ({
        scout: action.data
      })
    ),
  })
);
