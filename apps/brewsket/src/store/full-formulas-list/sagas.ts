import axios from 'axios';
import { take } from 'lodash';

import { createSaga } from '../../modules';
import { loadError, loadStart, loadSuccess } from './actions';
import { Formulae } from './types';

async function getFormulaes(): Promise<Formulae[]> {
  const formulaes = await axios.get(
    'https://formulae.brew.sh/api/formula.json',
  );

  return take(formulaes.data, 50);
}
export const sagas = [
  createSaga<null, Formulae[]>(getFormulaes, loadStart, loadSuccess, loadError),
];
