import React from 'react';
// import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Avatar, Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsNoneIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Menu'
import {Link} from 'react-router-dom';
import "./header.css"


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   header: {
//     display: 'flex',
//     flexDirection: "row",
//     justifyContent: "space-between"
//   },
//   large: {
//     width: theme.spacing(7),
//     height: theme.spacing(7),
//   },
// }));

export default function Header() {
  const classes = {
  }
  // const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background:  '#FF6B00' }}>
        <Toolbar className={classes.header}>
            <Link to='/'>
                <IconButton>
                  <MenuIcon style={{ color: 'white' }}/>                    
                </IconButton>
            </Link>
            <div style={{display: 'flex', justifyContent: 'right'}}>
            {/* <Link to='/notifications'>
                <Button >
                    <NotificationsNoneIcon style={{ color: 'white'}}/>
                </Button>
            </Link> */}

            <Link to='/stockPage'>
                <Button >
                    Stock Page
                </Button>
            </Link>   

            <Link to='/transactionsPage'>
                <Button>
                    Transactions Page
                </Button>
            </Link>

            <Link to='/portfolioPage'>
                <Button>
                    Portfolio Page
                </Button>
            </Link>
                
            <Link to='/signup'>
                <Button >
                    Sign Up
                </Button>
            </Link>            

            <Link to='/signin'>
                <Button >
                    Sign In
                </Button>
            </Link>            


            <Link to='/settings'>
                <Button>
                    <SettingsIcon style={{ color: 'white' }}/>
                </Button>
            </Link>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}