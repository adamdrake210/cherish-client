import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Link from 'next/link';
import { useUserContext } from '../context/userContext';
import Logout from './Auth/Logout';
import UserAvatar from './UserAvatar';

const useStyles = makeStyles(() => ({
  appbar: {
    backgroundColor: '#fffec1',
  },
  list: {
    width: 350,
  },
  menuButton: {
    color: 'red',
  },
}));

export default function Nav() {
  const classes = useStyles();
  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
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
      <div className="navigation-container">
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar className="navigation-list-container">
            <Link href="/">
              <a variant="h6" className="cherish-logo cherish-logo-nav">
                Cherish
              </a>
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
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
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
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={isOpenDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ul className="mobile-sidemenu-navigation-links">
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
