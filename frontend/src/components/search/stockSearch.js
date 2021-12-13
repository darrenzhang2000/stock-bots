import SearchIcon from '@mui/icons-material/Search';
import { Alert, AlertTitle, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import React, { useState } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './styledSearchComponents';


// Let's you search for a specific stock by its ticker. Upon submit, 
// we make an axios get request to yahoo finance that gets the
// information we want which includes the following react props: 
// setDisplayRes, setTicker, setMarketPrice, setMarketChange, 
// setMarketDayHigh, setMarketDayLow, setMarketVolume, setMarketPreviousClose,
// setMarketOpen, setLongName, setMarketCap, setCurrency.
// A displayedRes and setTicker alert is also passed for conditional rendering. 
// These setState props update the parent component stockPage
const StockSearch = props => {
    const { setDisplayRes, setTicker, setMarketPrice, setMarketChange, setMarketDayHigh, setMarketDayLow, setMarketVolume, setMarketPreviousClose, setMarketOpen, setLongName, setMarketCap, setCurrency } = props
    const [searchInput, setSearchInput] = useState("")
    const [displayAlert, setDisplayAlert] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const handleOnChange = e => {
        e.preventDefault()
        setSearchInput(e.target.value)

        var headers = {
            'accept': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'X-API-KEY': process.env.REACT_APP_YAHOOFINANCE_API_KEY
        };;

        var options = {
            url: `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${e.target.value}`,
            headers: headers
        };

        axios(options).then(
            res => {
                if(res && res.data && !res.data.error){
                    let suggestedTickers = res.data.ResultSet.Result.map(obj => obj.symbol) 
                    setSuggestions(suggestedTickers)
                }

            }
        )

    }

    const handleClear = e => {
        e.preventDefault()
        setSearchInput("")
        setDisplayRes(false)
    }

    const handleOnSubmit = e => {
        e.preventDefault()
        setDisplayRes(false)

        var headers = {
            'accept': 'application/json',
            'X-API-KEY': process.env.REACT_APP_YAHOOFINANCE_API_KEY
        };

        var options = {
            url: `https://yfapi.net/v11/finance/quoteSummary/${searchInput.toUpperCase()}?lang=en&region=US&modules=price`,
            headers: headers
        };

        axios(options).then(res => {
            if (res.data.quoteSummary.error) {
                setSearchInput("")
                setDisplayRes(false)
                setErrorMsg(res.data.quoteSummary.error.description)
                setDisplayAlert(true)
            } else {
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
                setTicker(searchInput)
            }
        })
    }
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
    ]

    return <Paper
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '32px',
            paddingLeft: '64px'
        }}
    >

        {
            displayAlert ?
                <Alert severity="error" onClose={() => setDisplayAlert(false)}>
                    <AlertTitle>Error</AlertTitle>
                    {errorMsg}
                </Alert>
                : null
        }

        <Typography variant="h4" className="font-link"> Search stocks by ticker </Typography>



        {/* In order to make our app more stylistically appealing,
         we created the styledSearchComponent that is similar to the 
         one used in the Account. We used StyledSearchComponent
          component in stockSearch passing in the children props 
          of onChange and value. */}
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="GOOGL"
                onChange={handleOnChange}
                value={searchInput}
            />
        </Search>

        {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={suggestions}
            sx={{ width: 300, marginBottom: '32px', marginTop: '32px' }}
            onChange={handleOnChange}
            value={searchInput}
            renderInput={(params) => <TextField {...params} label="Stock tickers" />}
        /> */}

        <Button sx={{ width: '170px', marginBottom: '32px' }} variant="contained" color="primary" onClick={handleOnSubmit}>Search</Button>
        <Button sx={{ width: '170px' }} variant="contained" color="primary" onClick={handleClear}>Clear</Button>

    </Paper>
}

export default StockSearch
