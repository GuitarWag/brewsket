import Fuse from 'fuse.js';
import map from 'lodash/map';
import { IModule } from 'redux-dynamic-modules';

import { AsyncModule, AsyncState } from '../../modules/AsyncReducer';
import { RootState as FormulaesListRootState } from '../full-formulas-list/types';
import {
  FormulaesSearchStartPayload,
  FormulaesSearchSuccessPayload,
  NAMESPACE,
} from './types';

export interface RootState {
  [NAMESPACE]: AsyncState<
    FormulaesSearchStartPayload,
    FormulaesSearchSuccessPayload
  >;
}

const options = {
  includeScore: true,
  keys: ['name', 'full_name', 'desc'],
};

async function searchFormulaes(
  payload: FormulaesSearchStartPayload,
  state: RootState & FormulaesListRootState,
): Promise<FormulaesSearchSuccessPayload> {
  const list = state['formulaes-list'].data;
  const fuse = new Fuse(list || [], options);
  const result = fuse.search(payload.text);
  return map(result, 'item');
}

const { dynamicModule, hooks } = new AsyncModule<
  FormulaesSearchStartPayload,
  FormulaesSearchSuccessPayload,
  RootState & FormulaesListRootState
>(NAMESPACE, 'SEARCH_FORMULAES', searchFormulaes);

export const {
  useStartAsync: useLoadFormulaesSearch,
  useData: useFormulaesSearchData,
} = hooks;
export function getFormulaesSearchModule(): IModule<RootState> {
  return dynamicModule;
}
