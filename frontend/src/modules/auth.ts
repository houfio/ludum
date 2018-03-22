import { createModule } from '../utils/createModule';
import { createApiRequest } from '../utils/createApiRequest';
import { Token } from '../types';
import { User } from '../api/User';

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
    ),
    register: createAction<{ first_name: string, last_name: string, email: string, password: string }>('REGISTER')(
      payload => ({
        promise: createApiRequest<Token>('post', 'user/register', payload),
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
    getUser: createAction<Token>('GET_USER')(
      payload => ({
        promise: createApiRequest<User>('get', 'user', undefined, payload),
        queue: 'save'
      }),
      action => ({
        user: action.data
      })
    ),
    clearUser: createAction('CLEAR_USER')(
      payload => payload,
      () => ({
        user: undefined
      })
    )
  })
);
