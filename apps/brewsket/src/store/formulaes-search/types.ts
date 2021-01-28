import { AsyncState } from '../../modules/AsyncReducer';
import { Formulae } from '../full-formulas-list/types';

export interface FormulaesSearchStartPayload {
  text: string;
}

export const NAMESPACE = 'formulaes-search';

export type FormulaesSearchSuccessPayload = Formulae[];

export interface RootState {
  [NAMESPACE]: AsyncState<
    FormulaesSearchStartPayload,
    FormulaesSearchSuccessPayload
  >;
}
