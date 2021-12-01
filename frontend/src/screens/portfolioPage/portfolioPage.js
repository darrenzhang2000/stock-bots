import Typography from '@mui/material/Typography';
import React from 'react';
import Account from '../../components/account/account';
import OwnedStock from '../../components/ownedStocks/ownedStocks';

const PortfolioPage = () => {
    return (
        <div>
            <Typography variant="h4" className="font-link"> Portfolio Page</Typography>
            <OwnedStock/> {/* Displays a table of all the stocks owned by the user */}
            <Account/> {/* Displays the user's account, which includes the balance and withdraw/deposit methods*/}
        </div>

    )
}
export default PortfolioPage