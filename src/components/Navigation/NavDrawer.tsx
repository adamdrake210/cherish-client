import React from 'react';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import { List, ListItem, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { LoggedInLinks } from './LoggedInLinks';
import { LoggedOutLinks } from './LoggedOutLinks';

const drawerWidth = 200;

const useStyles = makeStyles<Theme>(theme => ({
  paper: {
    background: theme.palette.primary.main,
  },
}));

type Props = {
  isOpenDrawer: boolean;
  user: any; // TODO type
  setIsOpenDrawer: (arg: boolean) => void;
};

// @ts-ignore
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const NavDrawer = ({ isOpenDrawer, user, setIsOpenDrawer }: Props) => {
  const classes = useStyles();

  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isOpenDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      classes={{ paper: classes.paper }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose} size="large">
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
      <List
        role="presentation"
        onClick={handleDrawerClose}
        onKeyDown={handleDrawerClose}
      >
        <ListItem>{user ? <AccountCircle /> : ''}</ListItem>
        <List>{user ? <LoggedInLinks /> : <LoggedOutLinks />}</List>
      </List>
    </Drawer>
  );
};
