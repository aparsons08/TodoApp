import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
// @material-ui/icons

import adminNavbarLinksStyle from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.jsx";
import { secondaryColor } from "assets/jss/material-dashboard-pro-react";
import history from "services/History";
//import { Tooltip } from "@material-ui/core";

const useStyles = () => ({
  offerButton: {
    "&:hover": {
      backgroundColor: `${secondaryColor[1]} !important`
    }
  }
});

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    openNotification: false,
    openProfile: false,
    redirectToLogin: false
  };
  handleClickNotification = () => {
    this.setState({ openNotification: !this.state.openNotification });
  };
  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };
  handleClickProfile = () => {
    this.setState({ openProfile: !this.state.openProfile });
  };
  handleCloseProfile = () => {
    this.setState({ openProfile: false });
  };
  handleOpenViewings = () => {
    history.push("/admin/my-notifications");
  };
  handleOpenOffers = () => {
    history.push("/admin/offer-notifications");
  };
  render() {
    const { redirectToLogin } = this.state;
    if (redirectToLogin) {
      return <Redirect to="/auth/login" />;
    }
    const { classes, rtlActive } = this.props;
    // eslint-disable-next-line
    const { openNotification, openProfile } = this.state;
    // const searchButton =
    //   classes.top +
    //   " " +
    //   classes.searchButton +
    //   " " +
    //   classNames({
    //     [classes.searchRTL]: rtlActive
    //   });
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
      { [classes.dropdownItemRTL]: rtlActive }
    );
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });
    return (
      <div className={wrapper}>
        {/* <CustomInput
          rtlActive={rtlActive}
          formControlProps={{
            className: classes.top + " " + classes.search
          }}
          inputProps={{
            placeholder: rtlActive ? "بحث" : "Search",
            inputProps: {
              "aria-label": rtlActive ? "بحث" : "Search",
              className: classes.searchInput
            }
          }}
        />
        <Button
          color="white"
          aria-label="edit"
          justIcon
          round
          className={searchButton}
        >
          <Search
            className={classes.headerLinksSvg + " " + classes.searchIcon}
          />
        </Button> */}
        {/* <Button
          color="transparent"
          simple
          aria-label="Dashboard"
          justIcon
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Dashboard
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span className={classes.linkText}>
              {rtlActive ? "لوحة القيادة" : "Dashboard"}
            </span>
          </Hidden>
        </Button> */}
        <div className={managerClasses}>
          <Popper
            open={openNotification}
            anchorEl={this.anchorNotification}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !openNotification,
              [classes.popperResponsive]: true,
              [classes.popperNav]: true
            })}
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                id="notification-menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleCloseNotification}>
                    <MenuList role="menu">
                      {/* <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "إجلاء أوزار الأسيوي حين بل, كما"
                          : "Mike John responded to your email"}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "شعار إعلان الأرضية قد ذلك"
                          : "You have 5 new tasks"}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "ثمّة الخاصّة و على. مع جيما"
                          : "You're now friend with Andrew"}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive ? "قد علاقة" : "Another Notification"}
                      </MenuItem> */}
                      <MenuItem
                        onClick={() => history.push("/admin/my-notifications")}
                        className={dropdownItem}
                      >
                        {rtlActive ? "قد علاقة" : "Viewings"}
                      </MenuItem>
                      {/* <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive ? "قد فاتّبع" : "Another One"}
                      </MenuItem> */}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>

        <div className={managerClasses}></div>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

const headerLinksWithNavBarStyle = withStyles(adminNavbarLinksStyle)(
  HeaderLinks
);
export default withStyles(useStyles)(headerLinksWithNavBarStyle);
