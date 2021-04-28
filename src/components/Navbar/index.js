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
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <a>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          </a>
        </Link>

        <Typography variant="h6" className={classes.title}>
          Hey Paramesh Krishna welcome back
        </Typography>

        <Link href="/add">
          <a>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <AddCircleIcon />
            </IconButton>
          </a>
        </Link>

        <Link href="/details">
          <a>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <FormatListBulletedIcon />
            </IconButton>
          </a>
        </Link>
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
