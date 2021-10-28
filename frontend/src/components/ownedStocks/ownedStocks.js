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

const OwnedStocks = () => {
    const [ownedStocks, setOwnedStocks] = React.useState([])

    const getOwnedStocks = async () => {
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

        axios(options).then(async res => {
            let tempOwnedStocks = res.data.ownedStocks
            let tickers = tempOwnedStocks.map(s => s.ticker)
            let stockPricesHt = await getStockPrices(tickers)
            for(let i=0; i<tickers.length; i++){
                tempOwnedStocks[i].currentPrice = stockPricesHt[tickers[i]]
            }
            setOwnedStocks(tempOwnedStocks)
        })
    }

    const getStockPrices = async (tickerList) => {
        var headers = {
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        let tickerQueryParams = tickerList.join("%2C")
        var options = {
            url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${tickerQueryParams}`,
            headers: headers
        };

        let stockPricesHt = {}
        await axios(options).then(async res => {
            let stockResults = res.data.quoteResponse.result
            for (let i = 0; i < stockResults.length; i++) {
                let stockTicker = stockResults[i].symbol
                let stockPrice = stockResults[i].regularMarketPrice
                stockPricesHt[stockTicker] = stockPrice
            }
        })
        return stockPricesHt
    }

    useEffect(() => {
        console.log('transactions page')
        getOwnedStocks()
    }, [])

    return (
        <div>
            <TableContainer component={Paper} sx={{ marginTop: '32px', marginBottom: '32px' }}>
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
                        {ownedStocks.map((stock) => (
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
        </div>
    )
}

export default OwnedStocks
