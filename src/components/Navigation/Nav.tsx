import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { List, Theme, useTheme, Link } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box } from '@mui/system';
import { AccountCircle } from '@mui/icons-material';

import { useUserContext } from '@/context/userContext';
import Logout from '@/components/Auth/Logout';
import { NavDrawer } from './NavDrawer';
import { LoggedInLinks } from './LoggedInLinks';
import { LoggedOutLinks } from './LoggedOutLinks';
import { ColorModeContext } from '@/pages/_app';
import { ROUTE } from '@/routes/routeConstants';

const useStyles = makeStyles<Theme>(theme => ({
  menuButton: {
    display: 'block',
    color: 'red',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  list: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Nav = () => {
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

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          p: 1,
        }}
      >
        <AppBar position="fixed" sx={{ bgcolor: theme.palette.primary.light }}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: 900,
              width: '100%',
              my: 0,
              mx: 'auto',
            }}
          >
            <Link href={ROUTE.HOME} sx={{ flexGrow: 1 }}>
              <a className="cherish-logo cherish-logo-nav">Cherish</a>
            </Link>
            <List className={classes.list} dense>
              {user ? <LoggedInLinks /> : <LoggedOutLinks />}
            </List>
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
                    <AccountCircle fontSize="large" />
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
      </Box>
      <NavDrawer
        isOpenDrawer={isOpenDrawer}
        user={user}
        setIsOpenDrawer={setIsOpenDrawer}
      />
    </>
  );
};

export default Nav;
