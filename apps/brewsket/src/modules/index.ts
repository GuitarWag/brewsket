import { ActionCreator } from '@ez-dux/core';
import update from 'immutability-helper';
import { includes } from 'lodash';
import { ChangeEvent, useCallback, useState } from 'react';
import { Reducer } from 'redux';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { Formulae } from '../store/full-formulas-list/types';

export function createSaga<StartPayload, SuccessPayload, RootState>(
  promise: (payload: StartPayload, state: RootState) => Promise<SuccessPayload>,
  start: ActionCreator<string, StartPayload>,
  success: ActionCreator<string, SuccessPayload>,
  error: ActionCreator<string, Error>,
): () => Generator {
  function* sideEffect(action: ReturnType<typeof start>) {
    try {
      const state = yield select();
      const response = yield call(promise, action.payload, state);
      yield put(success(response, null));
    } catch (e) {
      put(error(e, null));
    }
  }
  return function* watcher(): Generator {
    yield takeLatest(start.type, sideEffect);
  };
}

export class BaseState {
  data: Formulae[] = [];

  isLoading = false;

  error: Error | null = null;
}

export function createReducer<State, Action>(
  initialState: BaseState & State,
  namespace: string,
): Reducer<BaseState, { type: string; payload: any } & Action> {
  return function reducer(state = initialState, action) {
    switch (true) {
      case !includes(action.type, namespace):
        return state;
      case includes(action.type, '_START'): {
        return update(state, {
          isLoading: { $set: true },
          error: { $set: null },
        });
      }
      case includes(action.type, '_SUCCESS'): {
        return update(state, {
          isLoading: { $set: false },
          data: { $set: action.payload },
        });
      }
      case includes(action.type, '_ERROR'): {
        return update(state, {
          isLoading: { $set: false },
          error: { $set: action.payload },
        });
      }
      default:
        return state;
    }
  };
}

interface UseFormField {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
export const useFormField = (): UseFormField => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target?.value);
  }, []);

  return {
    onChange,
    value,
  };
};
