import React, { useState } from 'react';
import Appbar from '@material-ui/core/Appbar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
export default function Navbar() {
    const classes = useStyles();
    return (
        <Appbar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Title
            </Typography>
            <Button color="inherit">
              Signup
            </Button>
          </Toolbar>
        </Appbar>
      );
}
