import React, { Component } from "react";
import logo from "../transparent.png";
import { AppBar, Typography, Box, Toolbar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IconButton, MenuIcon } from "@material-ui/icons";
const Nav = (props) => {
  const useStyles = makeStyles({
    logo: {
      maxWidth: 60,
    },
  });
  const classes = useStyles();
  return (
    <div>
      <Box>
        <AppBar
          position="static"
          className={classes.appbar}
          color="transparent"
          elevation={0}
        >
          <Toolbar>
            <Toolbar>
              <a
                href="http://www.learnwith.community"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo} alt="not available" className={classes.logo} />
              </a>
            </Toolbar>
            <Typography
              variant="h6"
              component="div"
              color="#a7ffeb"
              sx={{ flexGrow: 1 }}
            >
              LWC Exchange Sytem
            </Typography>

            <Typography color="#a7ffeb">{props.account}</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
export default Nav;
