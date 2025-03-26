"use client";
import * as React from 'react';
import { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { signOut, signIn, useSession } from "next-auth/react";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

export default function MenuAppBar() {
  const [sessionMenuAnchorEl, setSessionMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [navMenuAnchorEl, setNavMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const { status } = useSession();
  const router = useRouter();

  const handleSessionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSessionMenuAnchorEl(event.currentTarget);
  };

  const handleSessionMenuClose = () => {
    setSessionMenuAnchorEl(null);
  };

  const handleNavMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenuAnchorEl(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setNavMenuAnchorEl(null);
  };

  const handleCustomersClick = () => {
    router.push('/customers');
    handleNavMenuClose();
  };

  async function handleSignInClick() {
    await signIn();
  }
  
  async function handleSignOutClick() {
    await signOut();
    router.push('/sign-in');
  }

  const getSessionButton = (): ReactNode => {
    'use client'
    switch(status) {
      case 'loading':
        return <Button color="inherit">Loading...</Button>;
      case 'authenticated':
        return <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleSessionMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={sessionMenuAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(sessionMenuAnchorEl)}
            onClose={handleSessionMenuClose}
          >
            <MenuItem onClick={handleSignOutClick}>Sign out</MenuItem>
          </Menu>
        </div>
      default:
        return <Button onClick={handleSignInClick} color="inherit">Sign in</Button>;
      }
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleNavMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={navMenuAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(navMenuAnchorEl)}
            onClose={handleNavMenuClose}
          >
            <MenuItem onClick={handleCustomersClick}>Customers</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {getSessionButton()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}