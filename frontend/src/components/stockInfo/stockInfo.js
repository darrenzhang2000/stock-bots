import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

const StockInfo = props => {
    const { close, high, low, open, volume } = props
    return <TableContainer component={Paper} sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Close price</TableCell>
                    <TableCell>High price</TableCell>
                    <TableCell>Low price</TableCell>
                    <TableCell>Open price</TableCell>
                    <TableCell>Volumne price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>{close}</TableCell>
                    <TableCell>{high}</TableCell>
                    <TableCell>{low}</TableCell>
                    <TableCell>{open}</TableCell>
                    <TableCell>{volume}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}

export default StockInfo