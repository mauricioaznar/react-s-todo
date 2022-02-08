import { ProgramInterface } from '../../services/programs';
import IcecreamIcon from '@mui/icons-material/Icecream';
import Consistency from './consistency/Consistency';
import Responsiveness from './responsiveness/Responsiveness';
import Latency from './latency/Latency';
import Navigation from './navigation/Navigation';
import Staleness from './staleness/Staleness';
import Entropy from './entropy/Entropy';
import Priority from './priority/Priority';
import Accessibility from './accesibility/Accessibility';
import Internationalization from './internationalization/Internationalization';
import Delivery from './delivery/Delivery';
import Resilience from './resilience/Resilience';
import Abstraction from './abstraction/Abstraction';
import * as React from 'react';

export const uiEngineeringProgram: ProgramInterface = {
  primary: `#D98014`,
  secondary: `#9937A6`,
  description:
    'If you worked a user interface, you’ve likely dealt with at least some of these problems — either directly or using a library.',
  divider: `#D98014`,
  backgroundPrimary: `#5FA0D9`,
  backgroundSecondary: `#9ABBD9`,
  mode: 'light',
  name: 'ice_cream',
  title: 'UI Engineering',
  icon: IcecreamIcon,
  primaryFont: 'Smooch',
  secondaryFont: 'Cinzel Decorative',
  tertiaryFont: 'Paprika',
  textFont: 'Antic Slab',
  links: [
    {
      name: 'Consistency',
      path: '/consistency',
      component: <Consistency />,
      navbar: true,
      title: 'Consistency',
    },
    {
      name: 'Responsiveness',
      path: '/responsiveness',
      component: <Responsiveness />,
      navbar: true,
      title: 'Responsiveness',
    },
    {
      name: 'Latency',
      path: '/latency',
      component: <Latency />,
      navbar: true,
      title: 'Latency',
    },
    {
      name: 'Navigation',
      path: '/navigation',
      component: <Navigation />,
      navbar: true,
      title: 'Navigation',
    },
    {
      name: 'Staleness',
      path: '/staleness',
      component: <Staleness />,
      navbar: true,
      title: 'Staleness',
    },
    {
      name: 'Entropy',
      path: '/entropy',
      component: <Entropy />,
      navbar: true,
      title: 'Entropy',
    },
    {
      name: 'Priority',
      path: '/priority',
      component: <Priority />,
      navbar: true,
      title: 'Priority',
    },
    {
      name: 'Accessibility',
      path: '/accessibility',
      component: <Accessibility />,
      navbar: true,
      title: 'Accessibility',
    },
    {
      name: 'Internationalization',
      path: '/internationalization',
      component: <Internationalization />,
      navbar: true,
      title: 'Internationalization',
    },
    {
      name: 'Delivery',
      path: '/delivery',
      component: <Delivery />,
      navbar: true,
      title: 'Delivery',
    },
    {
      name: 'Resilience',
      path: '/resilience',
      component: <Resilience />,
      navbar: true,
      title: 'Resilience',
    },
    {
      name: 'Abstraction',
      path: '/abstraction',
      component: <Abstraction />,
      navbar: true,
      title: 'Abstraction',
    },
  ],
};
