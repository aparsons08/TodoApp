import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "components/CustomButtons/Button.jsx";
import history from "services/History";

import adminNavbarStyle from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.jsx";
import logo from "../../assets/img/logo_50cm.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  activeButton: {
    backgroundColor: "#00acc1 !important",
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: "#00acc1 !important"
    }
  }
}));

function AdminNavbar({ ...props }) {
  const { classes, color, rtlActive, location } = props || {};
  const { pathname } = location || {};
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive
    });
  const customStyles = useStyles();
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button
            className={classes.title}
            color="transparent"
            onClick={() => history.push("/app/todos")}
          >
            <img src={logo} alt="Todo App" style={{ width: 80, height: 40 }} />
          </Button>
          <Button
            className={pathname === "/app/todos" && customStyles.activeButton}
            color="transparent"
            onClick={() => history.push("/app/todos")}
          >
            Todos
          </Button>
          <Button
            className={`${pathname === "/app/contact" &&
              customStyles.activeButton}`}
            color="transparent"
            onClick={() => history.push("/app/contact")}
          >
            Contact
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks rtlActive={rtlActive} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
  location: PropTypes.object
};

export default withStyles(adminNavbarStyle)(AdminNavbar);
