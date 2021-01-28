import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { getFormulaesSearchModule } from './module';

const modules = [getFormulaesSearchModule()];

interface Props {
  children: React.ReactNode;
}
export const Loader: React.FC<Props> = ({ children }: Props) => (
  <DynamicModuleLoader modules={modules}>{children}</DynamicModuleLoader>
);
