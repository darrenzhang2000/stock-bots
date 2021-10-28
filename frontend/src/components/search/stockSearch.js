import SearchIcon from '@mui/icons-material/Search';
import { Buttœon, Typography, Alert, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './styledSearchComponents';

const StockSearch = props => {
    const { setDisplayRes, setTicker, setMarketPrice, setMarketChange, setMarketDayHigh, setMarketDayLow, setMarketVolume, setMarketPreviousClose, setMarketOpen, setLongName, setMarketCap, setCurrency } = props
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
            url: `https://yfapi.net/v11/finance/quoteSummary/${searchInput}?lang=en&region=US&modules=price`,
            headers: headers
        };

        axios(options).then(res => {
            console.log(res.data.quoteSummary.result[0].price)
            const price = res.data.quoteSummary.result[0].price
            setMarketPrice(price.regularMarketPrice.fmt)
            setMarketChange(price.regularMarketChange.fmt)
            setMarketDayHigh(price.regularMarketDayHigh.fmt)
            setMarketDayLow(price.regularMarketDayLow.fmt)
            setMarketVolume(price.regularMarketVolume.fmt)
            setMarketPreviousClose(price.regularMarketPreviousClose.fmt)
            setMarketOpen(price.regularMarketOpen.fmt)
            setLongName(price.longName)
            setMarketCap(price.marketCap.fmt)
            setCurrency(price.currency)
            setDisplayRes(true)
            setTicker(e.target.value)
        })
    }

    return <div>

        {
            displayAlert ?
                <Alert severity="error" onClose={() => { setDisplayAlert(false) }}>Error - stock ticker does not exist!</Alert>
                : null
        }

        <Typography variant="h4" className="font-link"> Search stocks by ticker </Typography>

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