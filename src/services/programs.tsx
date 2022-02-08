import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { RouterLink } from './router-links';

import { uiEngineeringProgram } from '../programs/ui-engineering-program/program';
import { formsProgram } from '../programs/forms-program/program';
import { utilitiesProgram } from '../programs/utilities-program/program';
import { authProgram } from '../programs/auth-program/program';
import { testingProgram } from '../programs/testing-program/program';

export interface ProgramInterface {
  name: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  mode: 'light' | 'dark';
  divider: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  primaryFont: string;
  secondaryFont: string;
  tertiaryFont?: string;
  textFont: string;
  links: RouterLink[];
}

export const programs: ProgramInterface[] = [
  authProgram,
  uiEngineeringProgram,
  formsProgram,
  utilitiesProgram,
  testingProgram,
];
