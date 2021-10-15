import * as React from 'react';
import {Route, Switch } from 'react-router-dom';

// components
import Box from '@mui/material/Box';


// icons
import PetsIcon from '@mui/icons-material/Pets';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CopyrightIcon from '@mui/icons-material/Copyright';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';

// templates
import CatList from "./templates/cat-list/CatList";
import CatForm from "./templates/cat-list/CatForm";
import {
    Badge,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    List, ListItem, ListItemIcon, ListItemText,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import {ListItemLink} from "./components/ListItemLink";
import LogInForm from "./templates/auth/LoginForm";

const links = [
    {icon: <PetsIcon />, name: 'CatList', path: '/', component: CatList, exact: true },
    {icon: <InputIcon />, name: 'CatForm', path: '/catForm', component: CatForm },
    {icon: <LoginIcon />, name: 'LogInForm', path: '/logInForm', component:  LogInForm},
];

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function App() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {setOpen(!open);};



    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
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
                    {links.map((link) => (
                        <ListItemLink
                            key={link.name}
                            primary={link.name}
                            icon={link.icon}
                            to={link.path}

                        />

                    ))}

                </List>
                <Divider />
                <List style={{ marginTop: `auto` }} >
                    <ListItem dense>
                        <ListItemIcon>
                            <CopyrightIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link color="inherit" href="https://www.mauaznar.com/">
                                Mau Aznar
                            </Link>{'   '}
                            {new Date().getFullYear()}
                            {'.'}
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3} justifyContent={'center'}>
                        {/* Chart */}
                        <Grid item xs>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    minHeight: '50vh'
                                }}
                            >
                                <Switch>
                                    {links.map((link) => (
                                        <Route
                                            key={link.name}
                                            path={link.path}
                                            component={link.component}
                                            exact={link.exact || false}
                                        />
                                    ))}
                                </Switch>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
