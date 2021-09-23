import React from "react";
import { Drawer, ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { Event, Link, Contacts, Info } from "@mui/icons-material";
import PropTypes from "prop-types";

const Sidebar = (props) => {
  const { setView } = props;
  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        py: 2,
        flexShrink: 0,
        width: 64,
        ".MuiDrawer-paper": {
          py: 2,
          width: 64,
          boxSizing: "border-box",
        },
      }}
    >
      <ButtonGroup orientation="vertical" size="large">
        <Tooltip title="Time Table" arrow placement="right">
          <IconButton onMouseEnter={() => setView("tt")}>
            <Event />
          </IconButton>
        </Tooltip>
        <Tooltip title="Useful Links" arrow placement="right">
          <IconButton onMouseEnter={() => setView("links")}>
            <Link />
          </IconButton>
        </Tooltip>
        <Tooltip title="Contacts" arrow placement="right">
          <IconButton onMouseEnter={() => setView("contacts")}>
            <Contacts />
          </IconButton>
        </Tooltip>
        <Tooltip title="About" arrow placement="right">
          <IconButton onMouseEnter={() => setView("about")}>
            <Info />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </Drawer>
  );
};

Sidebar.propTypes = {
  setView: PropTypes.func,
};

export default Sidebar;
