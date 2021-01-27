import { createSelector } from '@ez-dux/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IModule } from 'redux-dynamic-modules';

import { BaseState, createReducer } from '../../modules';
import { loadError, loadStart, loadSuccess } from './actions';
import { NAMESPACE } from './constants';
import { sagas } from './sagas';
import { Formulae } from './types';

const INITIAL_STATE = new BaseState();

export type Action =
  | ReturnType<typeof loadStart>
  | ReturnType<typeof loadSuccess>
  | ReturnType<typeof loadError>;

const createdReducer = createReducer<BaseState, Action>(INITIAL_STATE);

export const useStart = (): void => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadStart(null, null));
  }, [dispatch]);
};

interface RootState {
  [NAMESPACE]: BaseState;
}
export const useData = (): Formulae[] =>
  useSelector(createSelector<RootState, Formulae[]>(NAMESPACE, 'data'));

export function getFullFormulasListModule(): IModule<RootState> & {
  sagas: typeof sagas;
} {
  return {
    id: NAMESPACE,
    reducerMap: {
      // @ts-ignore
      [NAMESPACE]: createdReducer,
    },
    sagas,
  };
}
