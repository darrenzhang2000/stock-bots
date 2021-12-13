import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, Route } from 'react-router-dom';
import './App.css';
import Drawer from './components/drawer/drawer';
import { secondaryListItems } from './components/drawer/listItems';
import Signin from './components/signin/signin';
import Signup from './components/signup/signup';
import { logout } from './reducers/loginReducer';
import DiversifiedReports from './screens/backtestingReports/diversifiedBacktestingReports';
import IndividualReports from './screens/backtestingReports/individualBacktestingReports';
import Home from './screens/home/home';
import PortfolioPage from './screens/portfolioPage/portfolioPage';
import StockPage from './screens/stockPage/stockPage';
import TransactionPage from './screens/transactionPage/transactionPage';
import StonksLogo from './stonksLogo.jpg';

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

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  var isLoggedIn = useSelector(state => state.login.login)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

// App mostly contains the Drawer and handles the routing to different pages
function App() {
  var isLoggedIn = useSelector(state => state.login.login)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="font-link">
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
              <img src={StonksLogo} width="40px" height="40px" />
            </Typography>
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
          <List>{!isLoggedIn ? <div>
            {/* {mainListItems} */}
            <Link to='/'>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home Page" />
              </ListItem>
            </Link>

            <Link to='/stockPage'>
              <ListItem button>
                <ListItemIcon>
                  <ShowChartIcon />
                </ListItemIcon>
                <ListItemText primary="Stock Page" />
              </ListItem>
            </Link>

            <Link to='/transactionsPage'>
              <ListItem button>
                <ListItemIcon>
                  <CompareArrowsIcon />
                </ListItemIcon>
                <ListItemText primary="Transactions Page" />
              </ListItem>
            </Link>

            <Link to='/portfolioPage'>
              <ListItem button>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="Portfolio Page" />
              </ListItem>
            </Link>

            <Link to='/signup'>
              <ListItem button>
                <ListItemIcon>
                  <PersonAddAlt1Icon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </Link>

            <Link to='/signin'>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItem>
            </Link>
          </div> : <div>
              {/* {mainListItems} */}
              <Link to='/'>
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home Page" />
                </ListItem>
              </Link>

              <Link to='/stockPage'>
                <ListItem button>
                  <ListItemIcon>
                    <ShowChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Stock Page" />
                </ListItem>
              </Link>

              <Link to='/transactionsPage'>
                <ListItem button>
                  <ListItemIcon>
                    <CompareArrowsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions Page" />
                </ListItem>
              </Link>


              <Link to='/portfolioPage'>
                <ListItem button>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Portfolio Page" />
                </ListItem>
              </Link>


              <Link to='/'>
                <ListItem button onClick={() => {
                  dispatch(logout())
                  isLoggedIn = false
                }}>
                  <ListItemIcon>
                    <PersonAddAlt1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItem>
              </Link>
            </div>}</List>
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
          <PrivateRoute exact path='/stockPage' >
            <StockPage />
          </PrivateRoute>
          <PrivateRoute path='/transactionsPage'>
            <TransactionPage />
          </PrivateRoute>
          <PrivateRoute path='/portfolioPage'>
            <Route exact path='/portfolioPage' component={PortfolioPage} />
          </PrivateRoute>
          <Route exact path='/individualReports' component={IndividualReports} />
          <Route exact path='/diversifiedReports' component={DiversifiedReports} />
        </Box>
      </Box>
    </div >
  );
}

export default App;
