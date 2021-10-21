import React from 'react'
import axios from 'axios'

const Search = props => {
    // const { searchInput, close, high, low, open, volume } = props
    const { setSearchInput, setDisplayRes, setClose, setHigh, setLow, setOpen, setVolume } = props

    const handleOnSubmit = e => {
        e.preventDefault()

        var headers = {
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };
        
        var options = {
            url: 'https://yfapi.net/v8/finance/chart/AAPL?range=1d&region=US&interval=1d&lang=en&events=div%2Csplit',
            headers: headers
        };

        axios(options).then(res => {
            console.log(res)
            var quotes = res.data.chart.result[0].indicators.quote[0]
            console.log(quotes)
            const { close, high, low, open, volume } = quotes
            setClose(close[0])
            setHigh(high[0])
            setLow(low[0])
            setOpen(open[0])
            setVolume(volume[0])
            setDisplayRes(true)
            console.log(close[0], high[0], low[0], open[0], volume[0])
        })
    }

    const handleOnClick = e => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    const handleClear = e => {
        e.preventDefault()
        setDisplayRes(false)
    }

    return <div>
        <form>
            <label htmlFor="header-search">
                <span className="visually-hidden">Search stocks by ticker</span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="googl"
                name="s" 
                onChange={handleOnClick}
            />
            <button type="submit" onClick={handleOnSubmit}>Search</button>
            <button type="submit" onClick={handleClear}>Clear</button>
        </form>
    </div>
}

export default Search