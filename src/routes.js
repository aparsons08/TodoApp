import Todos from "views/Pages/Todos";
import Contact from "views/Pages/Contact";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

var dashRoutes = [
  {
    path: "/todos",
    name: "Todos",
    icon: FormatListBulletedIcon,
    component: Todos,
    layout: "/app"
  },
  {
    path: "/contact",
    name: "Contact",
    icon: ContactPhoneIcon,
    component: Contact,
    layout: "/app"
  }
];
export default dashRoutes;
