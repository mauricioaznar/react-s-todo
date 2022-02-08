import { ProgramInterface } from '../../services/programs';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserForm from '../auth-program/UserForm';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UserList from '../auth-program/UserList';
import * as React from 'react';

export const authProgram: ProgramInterface = {
  primary: `#A6A6A6`,
  secondary: `#595959`,
  description: 'create, read, update and delete users',
  divider: `#595959`,
  backgroundPrimary: `#262626`,
  backgroundSecondary: `#0D0D0D`,
  mode: 'dark',
  name: 'auth',
  title: 'Auth',
  icon: PeopleIcon,
  primaryFont: 'Poiret One',
  secondaryFont: 'Coda',
  textFont: 'Open Sans',
  links: [
    {
      icon: <PersonAddIcon />,
      name: 'SignInForm',
      path: '/signInForm',
      component: <UserForm />,
      title: 'Sign in',
    },
    {
      icon: <PeopleAltIcon />,
      name: 'UserList',
      path: '/users',
      component: <UserList />,
      navbar: true,
      title: 'Users',
    },
  ],
};
