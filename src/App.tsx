import * as React from 'react';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    MemoryRouter as Router, Route, Switch,
} from 'react-router-dom';


import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

//templates
// todo missing sign-in-s
//  ide
import Dashboard from "./templates/dashboard";
import StickyFooter from "./templates/sticky-footer";
import SignUp from "./templates/sign-up";
import SignIn from "./templates/sign-in";
import Pricing from "./templates/pricing";
import Checkout from "./templates/checkout";
import Blog from "./templates/blog";
import Album from "./templates/album";

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy', path: '/' },
  { icon: <SaveIcon />, name: 'Save', path: '/stickyFooter' },
  { icon: <PrintIcon />, name: 'Print', path: '/signUp' },
  { icon: <ShareIcon />, name: 'Share', path: '/signIn' },
];

export default function App() {
  return (
      <Router>
              <Box>
                  <SpeedDial
                      ariaLabel="SpeedDial basic example"
                      sx={{ position: 'absolute', bottom: 16, right: 16 }}
                      icon={<SpeedDialIcon />}
                  >
                      {actions.map((action) => (
                          <SpeedDialAction
                              key={action.name}
                              icon={<RouterLink to={action.path}>{ action.icon }</RouterLink>}
                              tooltipTitle={action.name}

                          />
                      ))}
                  </SpeedDial>
              </Box>
              <Switch>
                  <Route path="/" exact>
                      <Dashboard />
                  </Route>
                  <Route path="/stickyFooter">
                      <StickyFooter />
                  </Route>
                  <Route path="/signUp">
                      <SignUp />
                  </Route>
                  <Route path="/signIn">
                      <SignIn />
                  </Route>
              </Switch>
      </Router>
  );
}
