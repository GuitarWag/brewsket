import axios from 'axios';
import { take } from 'lodash';
import { IModule } from 'redux-dynamic-modules';

import { AsyncModule, AsyncState } from '../../modules/AsyncReducer';
import {
  FormulaesListStartPayload,
  FormulaesListSuccessPayload,
  NAMESPACE,
} from './types';

export interface RootState {
  [NAMESPACE]: AsyncState<null, FormulaesListSuccessPayload>;
}

async function getFormulaes(): Promise<FormulaesListSuccessPayload> {
  const result = await axios.get('https://formulae.brew.sh/api/formula.json');
  return take(result.data, 20);
}

const { dynamicModule, hooks } = new AsyncModule<
  FormulaesListStartPayload,
  FormulaesListSuccessPayload,
  RootState
>(NAMESPACE, 'LOAD_FORMULAES', getFormulaes);

export const {
  useStartAsyncOnMount: useLoadFormulaesListOnMount,
  useData: useFormulaesList,
} = hooks;
export function getFullFormulasListModule(): IModule<RootState> {
  return dynamicModule;
}
