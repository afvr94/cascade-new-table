import { createContext, useContext as useReactContext, Dispatch } from 'react';
import { initialState } from './reducer';
import { Action, State } from './types';

type Store = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const Context = createContext<Store>({
  state: initialState,
  dispatch: () => {},
});

export const useContext = (): Store => useReactContext(Context);
