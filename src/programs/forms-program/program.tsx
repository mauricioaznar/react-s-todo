import { ProgramInterface } from '../../services/programs';
import ParkIcon from '@mui/icons-material/Park';
import PetsIcon from '@mui/icons-material/Pets';
import CatList from './cat/CatList';
import FormikForm from './cat/FormikForm';
import * as React from 'react';

export const formsProgram: ProgramInterface = {
  primary: `#E0AC84`,
  secondary: `#AC8466`,
  description: 'Get to know the most known react form libraries used to date. ',
  divider: `#E6D7CC`,
  backgroundPrimary: `#614A39`,
  backgroundSecondary: `#615B56`,
  mode: 'dark',
  name: 'forest',
  title: 'React form libraries',
  icon: ParkIcon,
  primaryFont: 'Lobster',
  secondaryFont: 'Lobster',
  textFont: 'Antic Slab',
  links: [
    {
      icon: <PetsIcon />,
      name: 'CatList',
      path: '/cats',
      component: <CatList />,
      navbar: true,
      title: 'React hook form',
    },
    {
      icon: <PetsIcon />,
      name: 'FormikForm',
      path: '/formikForm',
      component: <FormikForm />,
      navbar: true,
      title: 'Formik inputs',
    },
  ],
};
