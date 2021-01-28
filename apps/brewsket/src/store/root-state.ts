import { RootState as FormulaesSearchRootState } from './formulaes-search/types';
import { RootState as FormulaesListRootState } from './full-formulas-list/types';

export type RootState = FormulaesListRootState & FormulaesSearchRootState;
