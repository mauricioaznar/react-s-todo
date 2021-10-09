import * as React from 'react';
import {NavLink, Route,  Switch, useLocation} from 'react-router-dom';

// components
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {useTheme} from '@mui/material/styles';

// icons
import PetsIcon from '@mui/icons-material/Pets';
import InputIcon from '@mui/icons-material/Input';

// templates
import CatList from "./templates/cat-list";
import CatForm from "./templates/cat-list/CatForm";

const links = [
    {icon: <PetsIcon />, name: 'CatList', path: '/', component: CatList, exact: true },
    {icon: <InputIcon />, name: 'CatForm', path: '/catForm', component: CatForm },
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
                sx={{position: 'fixed', bottom: 16, right: 16}}
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
