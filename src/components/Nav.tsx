import React, { useState } from 'react';
import Link from 'next/link';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import { Theme, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useUserContext } from '../context/userContext';
import Logout from './Auth/Logout';
import UserAvatar from './UserAvatar';
import { ColorModeContext } from '../pages/_app';

const useStyles = makeStyles<Theme>(theme => ({
  appBarContainer: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(1, 0),
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    display: 'block',
    color: 'red',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function Nav() {
  const classes = useStyles();
  const theme = useTheme();
  const { user } = useUserContext();
  const colorMode = React.useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setIsOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  };

  return (
    <>
      <div className={classes.appBarContainer}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className="navigation-list-container">
            <Link href="/">
              <a className="cherish-logo cherish-logo-nav">Cherish</a>
            </Link>
            <ul className="navigation-links">
              {user && (
                <>
                  <li>
                    <Link href="/add-person">
                      <a>Add Person</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/calendar">
                      <a>Calendar</a>
                    </Link>
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link href="/register">
                    <a>Register</a>
                  </Link>
                </li>
              )}
              <li>
                {!user && (
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                )}
              </li>
            </ul>
            {user && (
              <>
                <div className="desktop">
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                  >
                    {theme.palette.mode === 'dark' ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </IconButton>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    size="large"
                  >
                    <UserAvatar displayName={user.displayName} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      {user && <Logout />}
                    </MenuItem>
                  </Menu>
                </div>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={classes.menuButton}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        variant="persistent"
        anchor="right"
        open={isOpenDrawer}
        classes={{
          paper: 'drawer-paper',
        }}
      >
        <div role="presentation" onKeyDown={handleDrawerClose}>
          <IconButton onClick={handleDrawerClose} size="large">
            <ChevronRightIcon />
          </IconButton>
        </div>
        <ul
          className="mobile-sidemenu-navigation-links"
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <li>{user ? <UserAvatar displayName={user.displayName} /> : ''}</li>
          {user && (
            <>
              <li>
                <Link href="/add-person">
                  <a>Add Person</a>
                </Link>
              </li>
              <li>
                <Link href="/calendar">
                  <a>Calendar</a>
                </Link>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </li>
          )}
          <li>
            {user ? (
              <Logout />
            ) : (
              <Link href="/login">
                <a>Login</a>
              </Link>
            )}
          </li>
        </ul>
      </Drawer>
    </>
  );
}
