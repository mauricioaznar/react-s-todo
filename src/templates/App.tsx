import * as React from 'react';
import {ComponentType, ReactElement} from 'react';
import {Route, Switch} from 'react-router-dom';
import {animated, Spring} from 'react-spring'

// mui
import Box from '@mui/material/Box';
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
    Typography
} from "@mui/material";


// local
import CatList from "./cat/CatList";
import CatForm from "./cat/CatForm";
import {ListItemLink} from "../components/ListItemLink";
import {useActions} from "../hooks/useActions";
import SignInForm from "./auth/SignInForm";
import UserList from "./auth/UserList";
import TodoForm from "./todo/TodoForm";
import TodoList from "./todo/TodoList";
import {useApolloClient} from "@apollo/client";
import {Query, useTodoSubscription} from "../schema";
import {nameof} from "../helpers/nameof";

interface RouterLink {
    title: string;
    icon: ReactElement<any, any>,
    name: string;
    path: string;
    component: ComponentType<any>;
    exact?: boolean;
    navbar?: boolean;
}

const links: RouterLink[] = [
    {icon: <PetsIcon/>, name: 'CatList', path: '/', component: CatList, exact: true, navbar: true, title: 'Cats'},
    {icon: <InputIcon/>, name: 'CatForm', path: '/catForm', component: CatForm, title: 'Cat'},
    {icon: <PersonAddIcon/>, name: 'SignInForm', path: '/signInForm', component: SignInForm, title: 'Sign in'},
    {icon: <PeopleAltIcon/>, name: 'UserList', path: '/userList', component: UserList, navbar: true, title: 'Users'},
    {
        icon: <FormatListBulletedIcon/>,
        name: 'TodoList',
        path: '/todoList',
        component: TodoList,
        navbar: true,
        title: 'Todos'
    },
    {icon: <PlaylistAddIcon/>, name: 'TodoForm', path: '/todoForm', component: TodoForm, title: 'todo'},
];

const drawerWidth: number = 240;

export default function App() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const client = useApolloClient()
    const {logout} = useActions()
    // const theme = useTheme();
    // const matchesSmAndUp = useMediaQuery(theme.breakpoints.up('sm'));

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
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
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
                                    {links.map(({ name, path, component: Component, exact}) => (
                                        <Route
                                            key={name}
                                            path={path}
                                            render={(routeProps) => {
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
                                                                    <Component {...routeProps}  />
                                                                </animated.div>
                                                            }
                                                        }
                                                    </Spring>
                                                )
                                            }}
                                            exact={exact || false}
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
