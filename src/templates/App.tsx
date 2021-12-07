import * as React from 'react';
import {useMemo} from 'react';
import {Route, Switch} from 'react-router-dom';
import {animated, Spring} from 'react-spring'
import {useApolloClient} from "@apollo/client";

// mui
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import CopyrightIcon from '@mui/icons-material/Copyright';
import MenuIcon from '@mui/icons-material/Menu';
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
    SvgIcon,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";


// local
import {ListItemLink} from "../components/ListItemLink";
import {useActions} from "../hooks/useActions";
import {Query, useTodoSubscription} from "../schema";
import {nameof} from "../helpers/nameof";
import {AppVariantContext} from "../hooks/useAppVariant";
import {commonLinks} from "../services/router-links";


const drawerWidth: number = 240;


export default function App() {
    const theme = useTheme();

    const { toggleAppVariant, appVariant } = React.useContext(AppVariantContext);

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

    const links = useMemo(() => {
            return commonLinks.concat(appVariant?.links || [])
        }
    , [ appVariant ])


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
                    {
                        appVariant ?
                            <SvgIcon

                                fontSize={'large'}
                                component={appVariant.icon} sx={{
                                mr: 2
                            }} />
                            : null
                    }

                    <Typography
                        component="h3"
                        variant="h3"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        { appVariant?.title }
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
                    <ListItem button={true} onClick={toggleAppVariant}>
                        <ListItemIcon>
                            {theme.palette.mode === 'dark' ? <ModeNightIcon /> : <WbSunnyIcon />}
                        </ListItemIcon>
                        <ListItemText>
                            {appVariant?.title}
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
                                    {links.map(
                                        (
                                            { name,
                                                path,
                                                component: Elem,
                                                exact
                                            }) => {
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

                                </Switch>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
