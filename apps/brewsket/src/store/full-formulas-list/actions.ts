import { createAction } from '@ez-dux/core';

import { Formulae } from './types';

export const loadStart = createAction<'formulaes-list/LOAD_START'>(
  'formulaes-list/LOAD_START',
);
export const loadSuccess = createAction<
  'formulaes-list/LOAD_SUCCESS',
  Formulae[]
>('formulaes-list/LOAD_SUCCESS');
export const loadError = createAction<'formulaes-list/LOAD_ERROR', Error>(
  'formulaes-list/LOAD_ERROR',
);
