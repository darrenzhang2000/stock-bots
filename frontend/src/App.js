import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Drawer from './components/drawer/drawer';
import { mainListItems, secondaryListItems } from './components/drawer/listItems';
import Signin from './components/signin/signin';
import Signup from './components/signup/signup';
import Home from './screens/home/home';
import PortfolioPage from './screens/portfolioPage/portfolioPage';
import StockPage from './screens/stockPage/stockPage';
import TransactionPage from './screens/transactionPage/transactionPage';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import StonksLogo from './stonksLogo.jpg'
import ReactLogo from './logo.svg'
import { runTradingAlgorithm } from './runTradingAlgo.js'
import SavingsPage from './screens/savingsPage/savingsPage';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };



  useEffect(() => {
    runTradingAlgorithm()

  }, [])

  return (
    <div className="font-link">
      {/* <Header /> */}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed

            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography>
              {/* <StonksLogo/> */}
              <img src={StonksLogo} width="40px" height="40px" />
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            marginTop: '64px',
            padding: '32px'
          }}
        >
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/stockPage' component={StockPage} />
          <Route exact path='/transactionsPage' component={TransactionPage} />
          <Route exact path='/portfolioPage' component={PortfolioPage} />
          <Route exact path='/savingsPage' component={SavingsPage} />
        </Box>
        {/* <Footer /> */}
      </Box>
    </div >
  );
}

export default App;
