import SearchIcon from '@mui/icons-material/Search';
import { Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './styledSearchComponents';

const StockSearch = props => {
    const { setDisplayRes, setTicker, setClose, setHigh, setLow, setOpen, setVolume } = props
    const [searchInput, setSearchInput] = useState("")
    const [displayAlert, setDisplayAlert] = useState(false)

    const handleOnChange = e => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    const handleClear = e => {
        e.preventDefault()
        setSearchInput("")
        setDisplayRes(false)
    }

    const handleOnSubmit = e => {
        e.preventDefault()

        var headers = {
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        var options = {
            url: `https://yfapi.net/v8/finance/chart/${searchInput}?range=1d&region=US&interval=1d&lang=en&events=div%2Csplit`,
            headers: headers
        };

        axios(options).then(res => {
            console.log(res)
            var quotes = res.data.chart.result[0].indicators.quote[0]
            console.log(quotes)
            const { close, high, low, open, volume } = quotes
            if (close == null) { // invalid ticker
                console.log("invalid ticker")
                setDisplayRes(false)
                setSearchInput("")
                setDisplayAlert(true)
                return
            }
            setClose(close[0])
            setHigh(high[0])
            setLow(low[0])
            setOpen(open[0])
            setVolume(volume[0])
            setDisplayRes(true)
            setTicker(e.target.value)
            console.log(close[0], high[0], low[0], open[0], volume[0])
        })
    }

    return <div>

        {
            displayAlert ?
                <Alert severity="error" onClose={() => { setDisplayAlert(false) }}>Error - stock ticker does not exist!</Alert>
                : null
        }

        <Typography variant="h4"> Search stocks by ticker </Typography>

        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="googl"
                onChange={handleOnChange}
                value={searchInput}
            />
        </Search>

        <Button variant="contained" color="primary" onClick={handleOnSubmit}>Search</Button>
        <Button variant="contained" color="primary" onClick={handleClear}>Clear</Button>

    </div>
}

export default StockSearch