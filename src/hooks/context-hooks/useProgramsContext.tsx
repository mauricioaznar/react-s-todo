import React from 'react';
import {
  ProgramsContext,
  ProgramsContextInterface,
} from '../../global-state/context/programs-context';

export const useProgramsContext: () => ProgramsContextInterface = () => {
  return React.useContext(ProgramsContext);
};
