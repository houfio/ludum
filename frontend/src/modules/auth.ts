import { createModule } from '../utils/createModule';
import { createApiRequest } from '../utils/createApiRequest';
import { Token } from '../types';

export const auth = createModule(
  'auth',
  {
    token: localStorage.getItem('token') || undefined
  },
  createAction => ({
    login: createAction<{ email: string, password: string }>('LOGIN')(
      payload => ({
        promise: createApiRequest<Token>('post', 'user/login', payload),
        queue: 'save'
      }),
      action => {
        const token = action.data!.token;
        localStorage.setItem('token', token);

        return {
          token
        };
      }
    ),
    logout: createAction<Token>('LOGOUT')(
      payload => ({
        promise: createApiRequest<Token>('get', 'user/logout', undefined, payload),
        queue: 'save'
      }),
      () => {
        localStorage.removeItem('token');

        return {
          token: undefined
        }
      }
    )
  })
);
