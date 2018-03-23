import { stringify } from 'query-string';

import { createModule } from '../utils/createModule';
import { createApiRequest } from '../utils/createApiRequest';
import { Academy } from '../api/Academy';
import { Identifiable } from '../api/Identifiable';
import { AcademySubscription } from '../api/AcademySubscribtion';
import { Token } from '../types';

export const academy = createModule(
  'academy',
  {
    results: [],
    current: undefined,
    subscriptions: []
  },
  createAction => ({
    searchAcademies: createAction<{
      city: string,
      age?: string,
      position?: string,
      member_count?: string
    }>('SEARCH_ACADEMIES')(
      payload => ({
        promise: createApiRequest<Academy[]>('get', `academy/search?${stringify(payload)}`),
        queue: 'load'
      }),
      action => ({
        results: action.data || []
      })
    ),
    clearResults: createAction('CLEAR_RESULTS')(
      payload => payload,
      () => ({
        results: []
      })
    ),
    getAcademy: createAction<Identifiable>('GET_ACADEMY')(
      payload => ({
        promise: createApiRequest<Academy>('get', `academy/${payload.id}`),
        queue: 'load'
      }),
      action => ({
        current: action.data
      })
    ),
    clearCurrent: createAction('CLEAR_CURRENT')(
      payload => payload,
      () => ({
        current: undefined
      })
    ),
    getAcademySubscriptions: createAction<Identifiable & Token>('GET_ACADEMY_SUBSCRIBERS')(
      payload => ({
        promise:
          createApiRequest<AcademySubscription[]>('get', `academy/${payload.id}/subscribers`, undefined, payload),
        queue: 'load'
      }),
      action => ({
        subscriptions: action.data
      })
    ),
    clearAcademySubscriptions: createAction('CLEAR_ACADEMY_SUBSCRIPTIONS')(
      payload => payload,
      () => ({
        subscriptions: []
      })
    )
  })
);
