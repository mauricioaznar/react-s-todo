import * as React from 'react';
import { ProgramInterface } from '../../services/programs';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TodoList from './todo/TodoList';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TodoForm from './todo/TodoForm';
import NoteForm from './todo/NoteForm';
import NoteList from './todo/NoteList';

export const utilitiesProgram: ProgramInterface = {
  primary: `#F2CB05`,
  secondary: `#73260A`,
  description: '`Todo lists` provides you with the necessary tools to keep track of your tasks. ',
  divider: `#151340`,
  backgroundPrimary: `#151340`,
  backgroundSecondary: `#2B308C`,
  mode: 'dark',
  name: 'dwarves',
  title: 'Todo lists',
  icon: ChildCareIcon,
  primaryFont: 'Press Start 2P',
  secondaryFont: 'Racing Sans One',
  textFont: 'Quantico',
  links: [
    {
      icon: <FormatListBulletedIcon />,
      name: 'TodoList',
      path: '/todos',
      component: <TodoList archived={false} />,
      navbar: true,
      title: 'Todos',
    },
    {
      icon: <FormatListBulletedIcon />,
      name: 'Archive',
      path: '/archive',
      component: <TodoList archived={true} />,
      navbar: true,
      title: 'Archive',
    },
    {
      icon: <PlaylistAddIcon />,
      name: 'TodoForm',
      path: '/todoForm',
      component: <TodoForm />,
      title: 'todo',
    },
    {
      icon: <PlaylistAddIcon />,
      name: 'NoteForm',
      path: '/noteForm',
      component: <NoteForm />,
      title: 'Notes',
    },
    {
      icon: <PlaylistAddIcon />,
      name: 'Notes',
      path: '/notes',
      navbar: true,
      component: <NoteList />,
      title: 'Notes',
    },
  ],
};
