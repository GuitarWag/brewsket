import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';

type IState = Record<string, any>;

export const store: IModuleStore<IState> = createStore({
  initialState: {
    /** initial state */
  },
  enhancers: [],
  extensions: [getSagaExtension()],
});
