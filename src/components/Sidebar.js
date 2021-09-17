import React from "react";
import { Drawer, ButtonGroup, IconButton } from "@mui/material";
import { Event, Link } from "@mui/icons-material";
import PropTypes from "prop-types";

const Sidebar = (props) => {
  const { setView } = props;
  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        py: 2,
        width: 64,
        ".MuiDrawer-paper": {
          py: 2,
          width: 64,
        },
      }}
    >
      <ButtonGroup orientation="vertical" size="large">
        <IconButton onMouseEnter={() => setView("tt")}>
          <Event />
        </IconButton>
        <IconButton onMouseEnter={() => setView("links")}>
          <Link />
        </IconButton>
      </ButtonGroup>
    </Drawer>
  );
};

Sidebar.propTypes = {
  setView: PropTypes.func,
};

export default Sidebar;
