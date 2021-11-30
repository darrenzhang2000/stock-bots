import React from 'react'
import StockSearch from '../../components/search/stockSearch'
import StockInfo from '../../components/stockInfo/stockInfo'
import TrackedStockButton from '../../components/trackedStockButton/trackedStockButton'

// This page has 3 child components, the StockSearch component, 
// the StockInfo component, and the TrackedStockButton component. 
// Essentially searching a stock by its ticker (like GOOGL) sends an 
// api request to yahoo finance that gets some relevant information
// about the current stock. This info is passed into the StockInfo 
// component, which renders this information.
const StockPage = props => {
    const [displaySearchRes, setDisplayRes] = React.useState("")
    const [ticker, setTicker] = React.useState("")
    const [ marketPrice, setMarketPrice] = React.useState(0)
    const [ marketChange, setMarketChange] = React.useState(0)
    const [ marketDayHigh, setMarketDayHigh] = React.useState(0)
    const [ marketDayLow, setMarketDayLow] = React.useState(0)
    const [ marketVolume, setMarketVolume] = React.useState(0)
    const [ marketPreviousClose, setMarketPreviousClose] = React.useState(0)
    const [ marketOpen, setMarketOpen ] = React.useState(0)
    const [ longName, setLongName] = React.useState(0)
    const [ marketCap, setMarketCap] = React.useState(0)
    const [ currency, setCurrency] = React.useState(0)

    return <div>
        <StockSearch
            setDisplayRes={setDisplayRes}
            setMarketPrice={setMarketPrice}
            setMarketChange={setMarketChange}
            setMarketDayHigh={setMarketDayHigh}
            setMarketDayLow={setMarketDayLow}
            setMarketVolume={setMarketVolume}
            setMarketPreviousClose={setMarketPreviousClose}
            setMarketOpen={setMarketOpen}
            setLongName={setLongName}
            setMarketCap={setMarketCap}
            setCurrency={setCurrency}
            setTicker={setTicker}
            key="StockSearch"
        />
        {displaySearchRes ? <div>
            <StockInfo
                displaySearchRes={displaySearchRes}
                marketPrice={marketPrice}
                marketChange={marketChange}
                marketDayHigh={marketDayHigh}
                marketDayLow={marketDayLow}
                marketVolume={marketVolume}
                marketPreviousClose={marketPreviousClose}
                marketOpen={marketOpen}
                longName={longName}
                marketCap={marketCap}
                currency={currency}
            />
            <TrackedStockButton ticker={ticker} /> 
        </div>: null}

    </div>
}

export default StockPage
