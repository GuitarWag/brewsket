// eslint-disable-next-line max-classes-per-file
import {
  Action,
  ActionCreator,
  createAction,
  createSelector,
} from '@ez-dux/core';
import update from 'immutability-helper';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Reducer } from 'redux';
import { IModule } from 'redux-dynamic-modules';

import { createSaga } from './index';

interface Handler<S, A extends Action<string>> {
  (state: S, action: A): S;
}

export class ReducerBuilder<S, A extends Action<string>> {
  cases: Record<string, Handler<S, A>>;

  reducer: Reducer<S, A>;

  constructor(initialState: S) {
    this.cases = {};
    this.reducer = (state = initialState, action) => {
      if (action.type in this.cases) {
        return this.cases[action.type as string](state, action);
      }
      return state;
    };
  }

  addCase<T extends string>(
    type: T,
    handler: Handler<S, A>,
  ): ReducerBuilder<S, A> {
    this.cases = {
      ...this.cases,
      [type]: handler,
    };
    return this;
  }
}

export class AsyncState<StartPayload, SuccessPayload> {
  data: SuccessPayload | null = null;

  isLoading = false;

  error: Error | null = null;

  lastStartPayload: StartPayload | null = null;
}

export function createAsyncActions<StartPayload, SuccessPayload>(
  namespace: string,
  actionName: string,
): {
  start: ActionCreator<string, StartPayload>;
  success: ActionCreator<string, SuccessPayload>;
  error: ActionCreator<string, Error>;
} {
  const startType = `${namespace}/${actionName}_START`;
  const successType = `${namespace}/${actionName}_SUCCESS`;
  const errorType = `${namespace}/${actionName}_ERROR`;

  const start = createAction<typeof startType, StartPayload>(startType);
  const success = createAction<typeof successType, SuccessPayload>(successType);
  const error = createAction<typeof errorType, Error>(errorType);

  return {
    start,
    success,
    error,
  };
}

interface Hooks<StartPayload, SuccessPayload> {
  useStartAsync: () => (payload: StartPayload) => void;
  useStartAsyncOnMount: (payload: StartPayload) => void;
  useData: () => SuccessPayload | null;
  useIsLoading: () => boolean;
  useError: () => Error | null;
  useLastStartPayload: () => StartPayload | null;
}
export class AsyncModule<StartPayload, SuccessPayload, RootState> {
  dynamicModule: IModule<RootState>;

  hooks: Hooks<StartPayload, SuccessPayload>;

  constructor(
    id: string,
    actionName: string,
    asyncFunction: (
      payload: StartPayload,
      state: RootState,
    ) => Promise<SuccessPayload>,
  ) {
    const actions = createAsyncActions<StartPayload, SuccessPayload>(
      id,
      actionName,
    );
    const { reducer } = new ReducerBuilder(
      new AsyncState<StartPayload, SuccessPayload>(),
    )
      .addCase(actions.start.type, (state, action) =>
        update(state, {
          isLoading: { $set: true },
          error: { $set: null },
          lastStartPayload: { $set: action.payload },
        }),
      )
      .addCase(actions.success.type, (state, action) =>
        update(state, {
          isLoading: { $set: false },
          data: { $set: action.payload },
        }),
      )
      .addCase(actions.error.type, (state, action) =>
        update(state, {
          isLoading: { $set: false },
          error: { $set: action.payload },
        }),
      );
    this.dynamicModule = {
      id,
      // @ts-ignore
      reducerMap: {
        [id]: reducer,
      },
      sagas: [
        createSaga<StartPayload, SuccessPayload, RootState>(
          asyncFunction,
          actions.start,
          actions.success,
          actions.error,
        ),
      ],
    };
    this.hooks = {
      useData: () => useSelector(createSelector<RootState>(id, 'data')),
      useIsLoading: () =>
        useSelector(createSelector<RootState, boolean>(id, 'isLoading')),
      useError: () =>
        useSelector(createSelector<RootState, Error | null>(id, 'error')),
      useLastStartPayload: () =>
        useSelector(createSelector<RootState>(id, 'lastStartPayload')),
      useStartAsync: () => {
        const disptach = useDispatch();
        return useCallback(
          (payload: StartPayload) => {
            disptach(actions.start(payload, null));
          },
          [disptach],
        );
      },
      useStartAsyncOnMount: (payload: StartPayload) => {
        const disptach = useDispatch();
        useEffect(() => {
          disptach(actions.start(payload, null));
        }, [disptach, payload]);
      },
    };
  }
}
