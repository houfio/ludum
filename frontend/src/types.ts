import { RouterState } from 'react-router-redux';
import { FormState } from 'redux-form';
import { Action } from 'redux';

export type State = {
  router: RouterState,
  form: FormState,
  auth: Partial<Token>,
  http: {
    queue: {
      [T in Queue['queue']]?: number
    }
  }
}

export type Token = {
  token: string
};

export type Queue = {
  queue: 'all' | 'save'
}

export type HeadingTypes = 'bold' | 'thin' | 'subtle';

export type ButtonTypes = 'primary' | 'secondary';

export type ApiResponse<T> = {
  success: boolean,
  data?: T,
  code?: number,
  message?: string
};

export type Module<S, T extends ActionReducers> = {
  name: string,
  initialState: S
} & T;

export type ActionReducers = {
  [name: string]: ActionReducer
};

export type ActionReducer<S = any, P = any, A = any> = {
  (payload?: P): A & Action,
  type: string,
  reduce: PartialReducer<S, UnboxPromise<A>>
};

export type PartialReducers = {
  [name: string]: {
    [type: string]: PartialReducer
  }
};

export type PartialReducer<S = any, A = any> = (action: UnboxPromise<A>, state: S) => Partial<S>;

export type CreateAction<S> = <P>(type: string) =>
  <A>(getAction: (payload: P) => A, reduce: PartialReducer<S, A>) => ActionReducer<S, P, A>;

export type UnboxPromise<A> = A extends { promise: Promise<infer E> } ? Omit<A, 'promise'> & E : A;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;