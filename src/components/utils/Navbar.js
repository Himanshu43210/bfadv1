import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@material-ui/core";

function Navbar({ role }) {
  const titleMapping = {
    BuilderFloorAdmin: "Builder Floor Admin",
    ChannelPartner: "Channel Partner",
    PropertyDealer: "Sales User",
  };
  return (
    <AppBar>
      <CssBaseline />
      <Toolbar>
        <Typography className="navbar-banner">
          {titleMapping[role]} Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
