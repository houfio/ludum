import { createModule } from '../utils/createModule';
import { createApiRequest } from '../utils/createApiRequest';
import { Academy } from '../api/Academy';
import { Identifiable } from '../api/Identifiable';

export const academy = createModule(
  'academy',
  {
    results: [],
    current: undefined
  },
  createAction => ({
    searchAcademies: createAction<{ city: string }>('SEARCH_ACADEMIES')(
      payload => ({
        promise: createApiRequest<Academy[]>('get', `academy/search?city=${payload.city}`),
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
    )
  })
);
