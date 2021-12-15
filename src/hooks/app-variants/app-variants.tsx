import IcecreamIcon from "@mui/icons-material/Icecream";
import ParkIcon from "@mui/icons-material/Park";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import {RouterLink} from "../../services/router-links";
import PetsIcon from "@mui/icons-material/Pets";
import CatList from "../../templates/cat/CatList";
import InputIcon from "@mui/icons-material/Input";
import CatForm from "../../templates/cat/CatForm";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TodoList from "../../templates/todo/TodoList";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import TodoForm from "../../templates/todo/TodoForm";
import * as React from "react";
import NoteForm from "../../templates/cat/NoteForm";
import Consistency from "../../templates/ui-engineering/consistency/Consistency";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserForm from "../../templates/auth/UserForm";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UserList from "../../templates/auth/UserList";


export interface AppVariantType {
    name: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    mode: 'light' | 'dark';
    divider: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string },
    primaryFont: string,
    secondaryFont: string,
    textFont: string,
    links: RouterLink[],
}


export const appVariants: AppVariantType[] = [
    {
        primary: `#D98014`,
        secondary: `#9937A6`,
        description: 'If you worked a user interface, you’ve likely dealt with at least some of these challenges — either directly or using a library.',
        divider: `#D98014`,
        backgroundPrimary: `#5FA0D9`,
        backgroundSecondary: `#9ABBD9`,
        mode: 'light',
        name: 'ice_cream',
        title: 'UI Engineering',
        icon: IcecreamIcon,
        primaryFont: 'Smooch',
        secondaryFont: 'Cinzel Decorative',
        textFont: 'Antic Slab',
        links: [
            {
                icon: <PetsIcon/>,
                name: 'Consistency',
                path: '/consistency',
                component: <Consistency/>,
                navbar: true,
                title: 'Consistency'
            },
        ]
    },
    {
        primary: `#E0AC84`,
        secondary: `#AC8466`,
        description: 'Get to know the most known react form libraries used to date. ',
        divider: `#E6D7CC`,
        backgroundPrimary: `#614A39`,
        backgroundSecondary: `#615B56`,
        mode: 'dark',
        name: 'forest',
        title: 'React form libraries',
        icon: ParkIcon,
        primaryFont: 'Lobster',
        secondaryFont: 'Lobster',
        textFont: 'Antic Slab',
        links: [

            {
                icon: <PetsIcon/>,
                name: 'CatList',
                path: '/cats',
                component: <CatList/>,
                navbar: true,
                title: 'React hook form'
            },
            {
                icon: <InputIcon/>,
                name: 'CatForm',
                path: '/catForm',
                component: <CatForm/>,
                title: 'Cat'
            },
            {
                icon: <PetsIcon/>,
                name: 'NoteForm',
                path: '/note',
                component: <NoteForm/>,
                navbar: true,
                title: 'Formik inputs'
            },
        ]
    },
    {
        primary: `#F2CB05`,
        secondary: `#73260A`,
        description: '`Todo lists` provides you with the necessary tools to keep track of your tasks. ',
        divider: `#151340`,
        backgroundPrimary: `#151340`,
        backgroundSecondary: `#2B308C`,
        mode: 'dark',
        name: 'dwarves',
        title: 'Todo lists',
        icon: ChildCareIcon,
        primaryFont: 'Press Start 2P',
        secondaryFont: 'Racing Sans One',
        textFont: 'Quantico',
        links: [
            {
                icon: <FormatListBulletedIcon/>,
                name: 'TodoList',
                path: '/todos',
                component: <TodoList archived={false}/>,
                navbar: true,
                title: 'Todos'
            },
            {
                icon: <FormatListBulletedIcon/>,
                name: 'Archive',
                path: '/archive',
                component: <TodoList archived={true}/>,
                navbar: true,
                title: 'Archive'
            },
            {
                icon: <PlaylistAddIcon/>,
                name: 'TodoForm',
                path: '/todoForm',
                component: <TodoForm/>,
                title: 'todo'
            },
            {
                icon: <PersonAddIcon/>,
                name: 'SignInForm',
                path: '/signInForm',
                component: <UserForm/>,
                title: 'Sign in'
            },
            {
                icon: <PeopleAltIcon/>,
                name: 'UserList',
                path: '/users',
                component: <UserList/>,
                navbar: true,
                title: 'Users'
            },
        ]
    },
]

