import {ReactElement} from "react";
import HomeIcon from "@mui/icons-material/Home";
import Home from "../templates/common/home/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserForm from "../templates/common/auth/UserForm";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UserList from "../templates/common/auth/UserList";
import * as React from "react";

export interface RouterLink {
    title: string;
    icon: ReactElement<any, any>,
    name: string;
    path: string;
    component: ReactElement<any, any>;
    exact?: boolean;
    navbar?: boolean;
}

export const commonLinks: RouterLink[] = [
    {icon: <HomeIcon />, name: 'Home', path: '/', component: <Home />, title: 'Sign in', exact: true},
    {icon: <PersonAddIcon/>, name: 'SignInForm', path: '/signInForm', component: <UserForm />, title: 'Sign in'},
    {icon: <PeopleAltIcon/>, name: 'UserList', path: '/users', component: <UserList />, navbar: true, title: 'Users'},
];
