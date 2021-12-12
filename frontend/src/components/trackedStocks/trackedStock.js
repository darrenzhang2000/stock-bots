import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

const TrackedStocks = () => {
    const [trackedStocks, setTrackedStocks] = React.useState([])
    var email = useSelector(state => state.login.user)

    // The get request queries the OwnedStock in the database to 
    // get all of the stocks owned by the user with the specified 
    // email
    const getTrackedStocks = async () =>{ 
    }


    useEffect(() => {
        getTrackedStocks()
    }, [])

    return (
        <div>
            {trackedStocks && trackedStocks.length > 0 ? <TableContainer component={Paper} sx={{ marginTop: '32px', marginBottom: '32px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticker</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Average Purchase Price</TableCell>
                            <TableCell align="right">Current Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trackedStocks.map((stock) => (
                            <TableRow
                                key={stock.ticker}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {stock.ticker}
                                </TableCell>
                                <TableCell align="right">{stock.quantity.$numberDecimal}</TableCell>
                                <TableCell align="right">{stock.averagePurchasePrice.$numberDecimal}</TableCell>
                                <TableCell align="right">{stock.currentPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                : <Typography variant="h6" className="font-link" sx={{ marginBottom: '32px', marginTop: '32px' }}> No stocks are being tracked by the trading algorithm.</Typography>
            }
        </div>
    )
}

export default TrackedStocks
