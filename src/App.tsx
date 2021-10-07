import * as React from 'react';
import {NavLink, Route,  Switch, useLocation} from 'react-router-dom';

// components
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {useTheme} from '@mui/material/styles';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';

// templates
import Dashboard from "./templates/dashboard";
import StickyFooter from "./templates/sticky-footer";
import SignUp from "./templates/sign-up";
import SignIn from "./templates/sign-in";
import SignInSide from "./templates/sign-in-side";
import Pricing from "./templates/pricing";
import Checkout from "./templates/checkout";
import Blog from "./templates/blog";
import Album from "./templates/album";

const links = [
    {icon: <DashboardIcon/>, name: 'Dashboard', path: '/', component: Dashboard, exact: true},
    {icon: <FormatUnderlinedIcon/>, name: 'Sticky footer', path: '/stickyFooter', component: StickyFooter},
    {icon: <PersonAddIcon/>, name: 'Sign up', path: '/signUp', component: SignUp},
    {icon: <PersonIcon/>, name: 'Sign in', path: '/signIn', component: SignIn},
    {icon: <PersonAddIcon/>, name: 'Sign in side', path: '/signInSide', component: SignInSide},
    {icon: <AttachMoneyIcon/>, name: 'Pricing', path: '/pricing', component: Pricing},
    {icon: <AddShoppingCartIcon/>, name: 'Checkout', path: '/checkout', component: Checkout},
    {icon: <TextSnippetIcon/>, name: 'Blog', path: '/blog', component: Blog},
    {icon: <PhotoAlbumIcon/>, name: 'Album', path: '/album', component: Album},
];

export default function App() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme()
    const location = useLocation();

    return (
        <Box>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{position: 'absolute', bottom: 16, right: 16}}
                direction={'left'}
                icon={<SpeedDialIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {links.map((link) => (
                    <SpeedDialAction
                        key={link.name}
                        tooltipTitle={link.name}
                        icon={<NavLink
                            strict
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === link.path ? theme.palette.primary.main : 'unset'
                            }}
                            exact={link.exact || false}
                            to={link.path}
                        >
                            {link.icon}
                        </NavLink>
                        }

                    />
                ))}
            </SpeedDial>
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
        </Box>
    );
}
