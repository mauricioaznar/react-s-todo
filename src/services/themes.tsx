import { Theme } from "../types/theme";
import IcecreamIcon from "@mui/icons-material/Icecream";
import PeopleIcon from "@mui/icons-material/People";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ParkIcon from "@mui/icons-material/Park";

export const themes: Theme[] = [
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
    title: "Ice cream",
    icon: IcecreamIcon,
    primaryFont: "Smooch",
    secondaryFont: "Cinzel Decorative",
    tertiaryFont: "Paprika",
    textFont: "Antic Slab",
  },
  {
    primary: `#A6A6A6`,
    secondary: `#595959`,
    description: "create, read, update and delete users",
    divider: `#595959`,
    backgroundPrimary: `#262626`,
    backgroundSecondary: `#0D0D0D`,
    mode: "dark",
    name: "auth",
    title: "Auth",
    icon: PeopleIcon,
    primaryFont: "Poiret One",
    secondaryFont: "Coda",
    textFont: "Open Sans",
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
    title: "Gaming",
    icon: ChildCareIcon,
    primaryFont: "Press Start 2P",
    secondaryFont: "Racing Sans One",
    textFont: "Quantico",
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
    title: "Forest",
    icon: ParkIcon,
    primaryFont: "Lobster",
    secondaryFont: "Lobster",
    textFont: "Antic Slab",
  },
];
