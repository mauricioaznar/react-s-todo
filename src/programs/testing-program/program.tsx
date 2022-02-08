import { ProgramInterface } from '../../services/programs';
import BugReportIcon from '@mui/icons-material/BugReport';
import * as React from 'react';
import Testing from './Testing';

export const testingProgram: ProgramInterface = {
  primary: `#8C694A`,
  secondary: `#048ABF`,
  description: 'Testing environment for different react components',
  divider: `#F2B8A2`,
  backgroundPrimary: `#05C7F2`,
  backgroundSecondary: `#A66249`,
  mode: 'dark',
  name: 'testing',
  title: 'Testing',
  icon: BugReportIcon,
  primaryFont: 'Poiret One',
  secondaryFont: 'Coda',
  textFont: 'Open Sans',
  links: [
    {
      icon: <BugReportIcon />,
      name: 'Testing',
      path: '/testing',
      navbar: true,
      component: <Testing />,
      title: 'Testing',
    },
  ],
};
