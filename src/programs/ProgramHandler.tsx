import * as React from 'react';
import { useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

// mui
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import CopyrightIcon from '@mui/icons-material/Copyright';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar as MuiAppBar,
  SwipeableDrawer as MuiDrawer,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SvgIcon,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// local
import { ListItemLink } from '../components/ListItemLink';
import { useActions } from '../hooks/redux-hooks/useActions';
import { Query, useTodoSubscription } from '../services/schema';
import { nameof } from '../helpers/nameof';
import { useProgramsContext } from '../hooks/context-hooks/useProgramsContext';
import { commonLinks } from '../services/router-links';
import AnimatedDiv from '../components/spring-components/AnimatedDiv';

const drawerWidth: number = 240;

export default function ProgramHandler() {
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('lg'));
  const history = useHistory();

  const { toggleAppVariant, currAppVariant } = useProgramsContext();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const client = useApolloClient();

  const { logout } = useActions();

  useTodoSubscription({
    onSubscriptionData({ client }) {
      client.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: nameof<Query>('todos'),
      });
    },
  });

  const links = useMemo(() => {
    return commonLinks.concat(currAppVariant?.links || []);
  }, [currAppVariant]);

  return (
    <Box sx={{ display: 'flex' }}>
      <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          {!mdAndUp ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          {currAppVariant && currAppVariant.icon ? (
            <IconButton
              sx={{ mr: 2 }}
              onClick={() => {
                history.push('/');
              }}
            >
              <SvgIcon fontSize={'large'} component={currAppVariant.icon} />
            </IconButton>
          ) : null}

          <Typography
            component="h2"
            variant="h2"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontSize: '3.2rem' }}
          >
            {currAppVariant?.title}
          </Typography>
          <IconButton
            color="inherit"
            onClick={async () => {
              await client.clearStore();
              logout();
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      <MuiDrawer
        variant={mdAndUp ? 'permanent' : 'temporary'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {links
            .filter((link) => link.navbar === true)
            .map((link) => {
              return (
                <ListItemLink
                  key={link.name}
                  primary={link.title}
                  icon={link.icon}
                  to={link.path}
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              );
            })}
        </List>
        <Divider />
        <List style={{ marginTop: `auto` }}>
          <ListItem button={true} onClick={toggleAppVariant}>
            <ListItemIcon>
              {theme.palette.mode === 'dark' ? <ModeNightIcon /> : <WbSunnyIcon />}
            </ListItemIcon>
            <ListItemText>{currAppVariant?.title}</ListItemText>
          </ListItem>
          <ListItem dense>
            <ListItemIcon>
              <CopyrightIcon />
            </ListItemIcon>
            <ListItemText>
              <Link color="inherit" href="https://www.mauaznar.com/">
                Mau Aznar
              </Link>
              {'   '}
              {new Date().getFullYear()}
              {'.'}
            </ListItemText>
          </ListItem>
        </List>
      </MuiDrawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} justifyContent={'center'}>
            <Grid item xs>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'stretch',
                  minHeight: '50vh',
                }}
              >
                <Switch>
                  {links.map(({ name, path, component: Elem, exact }) => {
                    return (
                      <Route
                        key={name}
                        path={path}
                        render={() => {
                          return <AnimatedDiv>{Elem}</AnimatedDiv>;
                        }}
                        exact={exact || false}
                      />
                    );
                  })}
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
