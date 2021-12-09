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

const OwnedStocks = () => {
    const [ownedStocks, setOwnedStocks] = React.useState([])
    var email = useSelector(state => state.login.user)

    // The get request queries the OwnedStock in the database to 
    // get all of the stocks owned by the user with the specified 
    // email
    const getOwnedStocks = async () => {
        var headers = {
            'accept': 'application/json',
        };

        var data = {
            email: email,
        }

        var options = {
            method: 'GET',
            url: 'http://localhost:5000/ownedStocks/',
            headers: headers,
            params: data
        };

        axios(options).then(async res => {
            let tempOwnedStocks = res.data.ownedStocks
            console.log('owned stocks', tempOwnedStocks)
            if (tempOwnedStocks == undefined) {
                return
            }
            let tickers = tempOwnedStocks.map(s => s.ticker)
            let stockPricesHt = await getStockPrices(tickers)
            for (let i = 0; i < tickers.length; i++) {
                tempOwnedStocks[i].currentPrice = stockPricesHt[tickers[i]]
            }
            setOwnedStocks(tempOwnedStocks)

        })
    }

    const getStockPrices = async (tickerList) => {
        var headers = {
            'accept': 'application/json',
            'X-API-KEY': process.env.REACT_APP_YAHOOFINANCE_API_KEY 
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
        getOwnedStocks()
    }, [])

    return (
        <div>
            {ownedStocks && ownedStocks.length > 0 ? <TableContainer component={Paper} sx={{ marginTop: '32px', marginBottom: '32px' }}>
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
                : <Typography variant="h6" className="font-link" sx={{ marginBottom: '32px', marginTop: '32px' }}> You do not own any stocks.</Typography>
            }
        </div>
    )
}

export default OwnedStocks
