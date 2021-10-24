import React, { useEffect } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'

const PortfolioPage = () => {
    const [ownedStocks, setOwnedStocks] = React.useState([])

    const getOwnedStocks = () => {
        var headers = {
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        var data = {
            email: 'testuser@gmail.com',
        }

        var options = {
            method: 'GET',
            url: 'http://localhost:5000/ownedStocks/',
            headers: headers,
            params: data
        };

        axios(options).then(res => {
            console.log(res)
            console.log(res.data.ownedStocks)
            setOwnedStocks(res.data.ownedStocks)
        })
    }

    useEffect(() => {
        console.log('transactions page')
        getOwnedStocks()
    }, [])

    return (
        <div>
            <Typography variant="h4"> portfolio page</Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticker</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ownedStocks.map((stock) => (
                            <TableRow
                                key={stock.ticker}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {stock.ticker}
                                </TableCell>
                                <TableCell align="right">{stock.quantity.$numberDecimal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PortfolioPage