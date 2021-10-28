import Typography from '@mui/material/Typography';
import React from 'react';
import Account from '../../components/account/account';
import OwnedStock from '../../components/ownedStocks/ownedStocks';

const PortfolioPage = () => {
    return (
        <div>
            <Typography variant="h4" className="font-link"> Portfolio Page</Typography>
            <OwnedStock/>
            <Account/>
        </div>

    )
}
export default PortfolioPage