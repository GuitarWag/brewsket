import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';

import { getFormulaesSearchModule } from './formulaes-search';
import { getFullFormulasListModule } from './full-formulas-list';
import { RootState } from './root-state';

export const store: IModuleStore<RootState> = createStore(
  {
    initialState: {
      /** initial state */
    },
    enhancers: [],
    extensions: [getSagaExtension()],
  },
  getFullFormulasListModule(),
  getFormulaesSearchModule(),
);
