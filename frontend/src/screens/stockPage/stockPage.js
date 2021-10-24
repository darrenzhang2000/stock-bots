import React from 'react'
import StockSearch from '../../components/search/stockSearch'
import StockInfo from '../../components/stockInfo/stockInfo'
import TrackedStockButton from '../../components/trackedStockButton/trackedStockButton'

const StockPage = props => {
    const [displaySearchRes, setDisplayRes] = React.useState("")
    const [close, setClose] = React.useState("")
    const [open, setOpen] = React.useState("")
    const [low, setLow] = React.useState("")
    const [high, setHigh] = React.useState("")
    const [volume, setVolume] = React.useState("")
    const [ticker, setTicker] = React.useState("")

    return <div>
        stock info page
        <StockSearch
            setDisplayRes={setDisplayRes}
            setClose={setClose}
            setOpen={setOpen}
            setLow={setLow}
            setHigh={setHigh}
            setVolume={setVolume}
            setTicker={setTicker}
            key="StockSearch"
        />
        {displaySearchRes ? <div>
            <StockInfo
                displaySearchRes={displaySearchRes}
                close={close}
                open={open}
                low={low}
                high={high}
                volume={volume}
            />
            <TrackedStockButton ticker={ticker} /> 
        </div>: null}

    </div>
}

export default StockPage