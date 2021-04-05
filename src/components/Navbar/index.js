import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "next/link";

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className={classes.title}>
          Hey Paramesh Krishna welcome back
        </Typography>
        <Link href="/profile">
          <a>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <AccountCircleIcon />
            </IconButton>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
