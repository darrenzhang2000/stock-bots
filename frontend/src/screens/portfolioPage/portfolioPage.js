import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import Account from '../../components/account/account';
import OwnedStock from '../../components/ownedStocks/ownedStocks';
import TrackedStocks from '../../components/trackedStocks/trackedStock';
import Paper from '@mui/material/Paper';

const PortfolioPage = () => {
    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '32px',
                    paddingLeft: '64px'
                }}
            >
                <Typography variant="h4" className="font-link"> Portfolio Page</Typography>
            </Paper>
            <OwnedStock /> {/* Displays a table of all the stocks owned by the user */}
            <Grid container >
                <Account />
                {/* Displays the user's account, which includes the balance and withdraw/deposit methods*/}
                <TrackedStocks />
            </Grid>
        </div>

    )
}
export default PortfolioPage