import Typography from '@mui/material/Typography';
import React from 'react';
import Account from '../../components/account/account';
import OwnedStock from '../../components/ownedStocks/ownedStocks';
import TrackedStocks from '../../components/trackedStocks/trackedStock';

const PortfolioPage = () => {
    return (
        <div>
            <Typography variant="h4" className="font-link"> Portfolio Page</Typography>
            <OwnedStock/> {/* Displays a table of all the stocks owned by the user */}
            <Account/> {/* Displays the user's account, which includes the balance and withdraw/deposit methods*/}
            <TrackedStocks/>
        </div>

    )
}
export default PortfolioPage