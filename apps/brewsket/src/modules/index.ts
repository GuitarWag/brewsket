import { ActionCreator } from '@ez-dux/core';
import update from 'immutability-helper';
import { includes } from 'lodash';
import { Reducer } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import { Formulae } from '../store/full-formulas-list/types';

export function createSaga<StartPayload, SuccessPayload>(
  promise: (payload: StartPayload) => Promise<SuccessPayload>,
  start: ActionCreator<string, StartPayload>,
  success: ActionCreator<string, SuccessPayload>,
  error: ActionCreator<string, Error>,
): () => Generator {
  function* sideEffect(action: ReturnType<typeof start>) {
    try {
      const response = yield call(promise, action.payload);
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
): Reducer<BaseState, { type: string; payload: any } & Action> {
  return (state = initialState, action) => {
    switch (true) {
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
