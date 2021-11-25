import * as React from 'react';
import {ReactElement} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {animated, Spring} from 'react-spring'
import {useApolloClient} from "@apollo/client";

// mui
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CopyrightIcon from '@mui/icons-material/Copyright';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/SwipeableDrawer';
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
    useTheme
} from "@mui/material";


// local
import {ListItemLink} from "../components/ListItemLink";
import {useActions} from "../hooks/useActions";
import SignInForm from "./auth/SignInForm";
import UserList from "./auth/UserList";
import TodoForm from "./todo/TodoForm";
import {Query, useTodoSubscription} from "../schema";
import {nameof} from "../helpers/nameof";
import ColorModeContext from "../services/color-mode-context";
import TodoList from "./todo/TodoList";

interface RouterLink {
    title: string;
    icon: ReactElement<any, any>,
    name: string;
    path: string;
    component: ReactElement<any, any>;
    exact?: boolean;
    navbar?: boolean;
}

const links: RouterLink[] = [
    {icon: <PersonAddIcon/>, name: 'SignInForm', path: '/signInForm', component: <SignInForm />, title: 'Sign in'},
    {icon: <PeopleAltIcon/>, name: 'UserList', path: '/users', component: <UserList />, navbar: true, title: 'Users'},
    {
        icon: <FormatListBulletedIcon/>,
        name: 'TodoList',
        path: '/todos',
        component: <TodoList archived={false} />,
        navbar: true,
        title: 'Todos'
    },
    {
        icon: <FormatListBulletedIcon/>,
        name: 'Archive',
        path: '/archive',
        component: <TodoList archived={true} />,
        navbar: true,
        title: 'Archive'
    },
    {icon: <PlaylistAddIcon/>, name: 'TodoForm', path: '/todoForm', component: <TodoForm />, title: 'todo'},
];

const drawerWidth: number = 240;

export default function App() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const client = useApolloClient()
    const {logout} = useActions()

    useTodoSubscription(
        {
            onSubscriptionData({client}) {
                client.cache.evict({
                    id: "ROOT_QUERY",
                    fieldName: nameof<Query>('todos')
                })
            },

        }
    );


    return (
        <Box sx={{display: 'flex'}}>
            <MuiAppBar
                position="fixed"
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
            >
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
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit" onClick={async () => {
                        await client.clearStore()
                        logout()
                    }}>
                        <LogoutIcon/>
                    </IconButton>
                </Toolbar>
            </MuiAppBar>

            <MuiDrawer
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                onOpen={() => {
                    setOpen(true)
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
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
                        <ChevronLeftIcon/>
                    </IconButton>
                </Toolbar>
                <Divider/>
                <List>
                    {
                        links
                            .filter(link => link.navbar === true)
                            .map((link) => {
                                return (
                                    <ListItemLink
                                        key={link.name}
                                        primary={link.title}
                                        icon={link.icon}
                                        to={link.path}
                                        onClick={() => { setOpen(false) }}
                                    />
                                )
                            })
                    }

                </List>
                <Divider/>
                <List style={{marginTop: `auto`}}>
                    <ListItem button={true} onClick={colorMode.toggleColorMode}>
                        <ListItemIcon>
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </ListItemIcon>
                        <ListItemText>
                            {theme.palette.mode} mode
                        </ListItemText>
                    </ListItem>
                    <ListItem dense>
                        <ListItemIcon>
                            <CopyrightIcon/>
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
            </MuiDrawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={3} justifyContent={'center'}>
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
                                    {links.map(({ name, path, component: Elem, exact}) => {
                                        return (
                                            <Route
                                                key={name}
                                                path={path}
                                                render={() => {
                                                    return (
                                                        <Spring
                                                            config={{
                                                                duration: 500
                                                            }}
                                                            from={{ opacity: 0 }}
                                                            to={{ opacity: 1 }}
                                                        >
                                                            {
                                                                (styles) => {
                                                                    return <animated.div style={styles}>
                                                                        { Elem }
                                                                    </animated.div>
                                                                }
                                                            }
                                                        </Spring>
                                                    )
                                                }}
                                                exact={exact || false}
                                            />
                                        )
                                    })}
                                    <Redirect to={'/todos'} from={'/'}/>
                                </Switch>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
