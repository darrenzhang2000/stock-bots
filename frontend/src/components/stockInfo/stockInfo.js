import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

// This is used to display the information we retrieved about 
// the stock in table format. Originally starting out as simple
// html tags, we decided to use two MUI table components to display
// the information we want. The info retrieved from the previous stockSearch 
// component is passed up to the stockPage component, which is then 
// passed down to the StockInfo component.
const StockInfo = props => {
    const { marketPrice, marketChange, marketDayHigh, marketDayLow, marketVolume, marketPreviousClose, marketOpen, longName, marketCap, currency } = props
    //const { close, high, low, open, volume } = props
    return <div>
        <TableContainer component={Paper} sx={{ marginTop: '32px', marginBottom: '32px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Long Name</TableCell>
                        <TableCell>Market Price</TableCell>
                        <TableCell>Market Change</TableCell>
                        <TableCell>Market Day High</TableCell>
                        <TableCell>Market Day Low</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{longName}</TableCell>
                        <TableCell>{marketPrice}</TableCell>
                        <TableCell>{marketChange}</TableCell>
                        <TableCell>{marketDayHigh}</TableCell>
                        <TableCell>{marketDayLow}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ marginTop: '32px', marginBottom: '32px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Market Volume</TableCell>
                        <TableCell>Market Previous Close</TableCell>
                        <TableCell>Market Open</TableCell>
                        <TableCell>Market Cap</TableCell>
                        <TableCell>Currency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{marketVolume}</TableCell>
                        <TableCell>{marketPreviousClose}</TableCell>
                        <TableCell>{marketOpen}</TableCell>
                        <TableCell>{marketCap}</TableCell>
                        <TableCell>{currency}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}

export default StockInfo
