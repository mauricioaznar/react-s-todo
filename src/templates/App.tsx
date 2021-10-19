import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

// components
import Box from '@mui/material/Box';


// icons
import PetsIcon from '@mui/icons-material/Pets';
import InputIcon from '@mui/icons-material/Input';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import CopyrightIcon from '@mui/icons-material/Copyright';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {styled} from '@mui/material/styles';

import MuiDrawer from '@mui/material/SwipeableDrawer';

// templates
import CatList from "./cat/CatList";
import CatForm from "./cat/CatForm";
import {
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
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {ListItemLink} from "../components/ListItemLink";
import {useActions} from "../hooks/useActions";
import SignInForm from "./auth/SignInForm";
import UserList from "./auth/UserList";
import TodoForm from "./todo/TodoForm";
import TodoList from "./todo/TodoList";

const links = [
    {icon: <PetsIcon />, name: 'CatList', path: '/', component: CatList, exact: true },
    {icon: <InputIcon />, name: 'CatForm', path: '/catForm', component: CatForm },
    {icon: <PersonAddIcon />, name: 'SignInForm', path: '/signInForm', component: SignInForm },
    {icon: <PeopleAltIcon />, name: 'UserList', path: '/userList', component: UserList },
    {icon: <FormatListBulletedIcon />, name: 'TodoList', path: '/todoList', component: TodoList },
    {icon: <PlaylistAddIcon />, name: 'TodoForm', path: '/todoForm', component: TodoForm },
];

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    [theme.breakpoints.up('sm')]: {
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
    },
}));

const Drawer = styled(MuiDrawer )(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            borderRight: 0,
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: 0,
                [theme.breakpoints.up('sm')]: {
                    position: 'relative',
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function App() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {setOpen(!open);};
    const {logout} = useActions()
    const theme = useTheme();
    const matchesSmAndUp = useMediaQuery(theme.breakpoints.up('sm'));



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
                    <IconButton color="inherit" onClick={() => { logout() }}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={matchesSmAndUp ? 'permanent' : undefined}
                open={open}
                onClose={() => { setOpen(false) }}
                onOpen={() => { setOpen(true) }}
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
