import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HomeIcon from '@mui/icons-material/Home';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';

// This is the MUI drawer that contains routes to all of the pages in our app.
export const mainListItems = (
    <div>
        <Link to='/'>
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home Page" />
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

        <Link to='/stockPage'>
            <ListItem button>
                <ListItemIcon>
                    <ShowChartIcon />
                </ListItemIcon>
                <ListItemText primary="Stock Page" />
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

        <Link to='/savingsPage'>
            <ListItem button>
                <ListItemIcon>
                    <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="Savings Page" />
            </ListItem>
        </Link>

    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <Link to='/individualReports'>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Individual reports" />
            </ListItem>
        </Link>
        <Link to='/diversifiedReports'>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Diversified reports" />
            </ListItem>
        </Link>
    </div>
);
