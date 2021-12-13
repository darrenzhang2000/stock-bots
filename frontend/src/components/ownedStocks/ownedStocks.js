import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
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
            url: `${process.env.REACT_APP_BACKEND_API}/ownedStocks/`,
            headers: headers,
            params: data
        };

        axios(options).then(async res => {
            let tempOwnedStocks = res.data.ownedStocks
            if (tempOwnedStocks == undefined) {
                return
            }

            let tickers = tempOwnedStocks.map(s => s.ticker)
            let stockPricesHt = await getStockPrices(tickers)
            for (let i = 0; i < tickers.length; i++) {
                tempOwnedStocks[i].currentPrice = stockPricesHt[tickers[i]]
                // unique id needed for MUI DataGrid
                tempOwnedStocks[i].id = i
            }
            setOwnedStocks(tempOwnedStocks)

        })
    }

    // Makes an api call to Yahoo Finance to get prices for each of the 
    // stocks in tickerList and adds it to the stocks
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'ticker',
            headerName: 'Ticker',
            width: 200,
            valueGetter: (params) => `${params.row.ticker}`
        },
        {
            field: 'current price',
            headerName: 'Current Price',
            width: 200,
            valueGetter: (params) => `${parseFloat(params.row.currentPrice).toFixed(2)}`
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 200,
            valueGetter: (params) => `${parseFloat(params.row.quantity.$numberDecimal).toFixed(2)}`
        },
    ]

    return (
        <div>
            {ownedStocks && ownedStocks.length > 0 ?
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '32px',
                        paddingLeft: '64px'
                    }}
                >
                    <div style={{ height: '300px', width: '100%' }}>
                        <DataGrid
                            rows={ownedStocks}
                            columns={columns}
                            pageSize={25}
                            rowsPerPageOptions={[25]}
                            options={{ responsive: 'scroll' }}
                        // rowsPerPageOptions={25, 50, 100}
                        />
                    </div>
                </Paper>
                
                : <Typography variant="h6" className="font-link" sx={{ marginBottom: '32px', marginTop: '32px' }}> You do not own any stocks.</Typography>
            }
        </div>
    )
}

export default OwnedStocks
