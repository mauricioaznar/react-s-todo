import IcecreamIcon from "@mui/icons-material/Icecream";
import ParkIcon from "@mui/icons-material/Park";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { RouterLink } from "../../services/router-links";
import PetsIcon from "@mui/icons-material/Pets";
import CatList from "../../templates/cat/CatList";
import InputIcon from "@mui/icons-material/Input";
import CatForm from "../../templates/cat/CatForm";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TodoList from "../../templates/todo/TodoList";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import TodoForm from "../../templates/todo/TodoForm";
import * as React from "react";
import FormikForm from "../../templates/cat/FormikForm";
import Consistency from "../../templates/ui-engineering/consistency/Consistency";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserForm from "../../templates/auth/UserForm";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UserList from "../../templates/auth/UserList";
import Responsiveness from "../../templates/ui-engineering/responsiveness/Responsiveness";
import Latency from "../../templates/ui-engineering/latency/Latency";
import Staleness from "../../templates/ui-engineering/staleness/Staleness";
import Entropy from "../../templates/ui-engineering/entropy/Entropy";
import Priority from "../../templates/ui-engineering/priority/Priority";
import Internationalization from "../../templates/ui-engineering/internationalization/Internationalization";
import Delivery from "../../templates/ui-engineering/delivery/Delivery";
import Resilience from "../../templates/ui-engineering/resilience/Resilience";
import Abstraction from "../../templates/ui-engineering/abstraction/Abstraction";
import Accessibility from "../../templates/ui-engineering/accesibility/Accessibility";
import Navigation from "../../templates/ui-engineering/navigation/Navigation";
import NoteForm from "../../templates/todo/NoteForm";
import NoteList from "../../templates/todo/NoteList";

export interface AppVariantType {
  name: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  mode: "light" | "dark";
  divider: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  primaryFont: string;
  secondaryFont: string;
  tertiaryFont?: string;
  textFont: string;
  links: RouterLink[];
}

export const appVariants: AppVariantType[] = [
  {
    primary: `#D98014`,
    secondary: `#9937A6`,
    description:
      "If you worked a user interface, you’ve likely dealt with at least some of these problems — either directly or using a library.",
    divider: `#D98014`,
    backgroundPrimary: `#5FA0D9`,
    backgroundSecondary: `#9ABBD9`,
    mode: "light",
    name: "ice_cream",
    title: "UI Engineering",
    icon: IcecreamIcon,
    primaryFont: "Smooch",
    secondaryFont: "Cinzel Decorative",
    tertiaryFont: "Paprika",
    textFont: "Antic Slab",
    links: [
      {
        name: "Consistency",
        path: "/consistency",
        component: <Consistency />,
        navbar: true,
        title: "Consistency",
      },
      {
        name: "Responsiveness",
        path: "/responsiveness",
        component: <Responsiveness />,
        navbar: true,
        title: "Responsiveness",
      },
      {
        name: "Latency",
        path: "/latency",
        component: <Latency />,
        navbar: true,
        title: "Latency",
      },
      {
        name: "Navigation",
        path: "/navigation",
        component: <Navigation />,
        navbar: true,
        title: "Navigation",
      },
      {
        name: "Staleness",
        path: "/staleness",
        component: <Staleness />,
        navbar: true,
        title: "Staleness",
      },
      {
        name: "Entropy",
        path: "/entropy",
        component: <Entropy />,
        navbar: true,
        title: "Entropy",
      },
      {
        name: "Priority",
        path: "/priority",
        component: <Priority />,
        navbar: true,
        title: "Priority",
      },
      {
        name: "Accessibility",
        path: "/accessibility",
        component: <Accessibility />,
        navbar: true,
        title: "Accessibility",
      },
      {
        name: "Internationalization",
        path: "/internationalization",
        component: <Internationalization />,
        navbar: true,
        title: "Internationalization",
      },
      {
        name: "Delivery",
        path: "/delivery",
        component: <Delivery />,
        navbar: true,
        title: "Delivery",
      },
      {
        name: "Resilience",
        path: "/resilience",
        component: <Resilience />,
        navbar: true,
        title: "Resilience",
      },
      {
        name: "Abstraction",
        path: "/abstraction",
        component: <Abstraction />,
        navbar: true,
        title: "Abstraction",
      },
    ],
  },
  {
    primary: `#E0AC84`,
    secondary: `#AC8466`,
    description:
      "Get to know the most known react form libraries used to date. ",
    divider: `#E6D7CC`,
    backgroundPrimary: `#614A39`,
    backgroundSecondary: `#615B56`,
    mode: "dark",
    name: "forest",
    title: "React form libraries",
    icon: ParkIcon,
    primaryFont: "Lobster",
    secondaryFont: "Lobster",
    textFont: "Antic Slab",
    links: [
      {
        icon: <PetsIcon />,
        name: "CatList",
        path: "/cats",
        component: <CatList />,
        navbar: true,
        title: "React hook form",
      },
      {
        icon: <InputIcon />,
        name: "CatForm",
        path: "/catForm",
        component: <CatForm />,
        title: "Cat",
      },
      {
        icon: <PetsIcon />,
        name: "FormikForm",
        path: "/formikForm",
        component: <FormikForm />,
        navbar: true,
        title: "Formik inputs",
      },
    ],
  },
  {
    primary: `#F2CB05`,
    secondary: `#73260A`,
    description:
      "`Todo lists` provides you with the necessary tools to keep track of your tasks. ",
    divider: `#151340`,
    backgroundPrimary: `#151340`,
    backgroundSecondary: `#2B308C`,
    mode: "dark",
    name: "dwarves",
    title: "Todo lists",
    icon: ChildCareIcon,
    primaryFont: "Press Start 2P",
    secondaryFont: "Racing Sans One",
    textFont: "Quantico",
    links: [
      {
        icon: <FormatListBulletedIcon />,
        name: "TodoList",
        path: "/todos",
        component: <TodoList archived={false} />,
        navbar: true,
        title: "Todos",
      },
      {
        icon: <FormatListBulletedIcon />,
        name: "Archive",
        path: "/archive",
        component: <TodoList archived={true} />,
        navbar: true,
        title: "Archive",
      },
      {
        icon: <PlaylistAddIcon />,
        name: "TodoForm",
        path: "/todoForm",
        component: <TodoForm />,
        title: "todo",
      },
      {
        icon: <PlaylistAddIcon />,
        name: "NoteForm",
        path: "/noteForm",
        component: <NoteForm />,
        title: "Notes",
      },
      {
        icon: <PlaylistAddIcon />,
        name: "Notes",
        path: "/notes",
        navbar: true,
        component: <NoteList />,
        title: "Notes",
      },
      {
        icon: <PersonAddIcon />,
        name: "SignInForm",
        path: "/signInForm",
        component: <UserForm />,
        title: "Sign in",
      },
      {
        icon: <PeopleAltIcon />,
        name: "UserList",
        path: "/users",
        component: <UserList />,
        navbar: true,
        title: "Users",
      },
    ],
  },
];
