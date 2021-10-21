import React from 'react'
import Search from '../../components/search/search'
import StockInfo from '../../components/stockInfo/stockInfo'

const StockPage = props => {
    console.log('stock page')

    const [searchInput, setSearchInput] = React.useState("")
    const [displaySearchRes, setDisplayRes] = React.useState("")
    const [close, setClose] = React.useState("")
    const [open, setOpen] = React.useState("")
    const [low, setLow] = React.useState("")
    const [high, setHigh] = React.useState("")
    const [volume, setVolume] = React.useState("")

    return <div>
        stock info page
        <Search
            setSearchInput={setSearchInput}
            setDisplayRes={setDisplayRes}
            setClose={setClose}
            setOpen={setOpen}
            setLow={setLow}
            setHigh={setHigh}
            setVolume={setVolume}
        />
        {displaySearchRes ? <StockInfo
            searchInput={searchInput}
            displaySearchRes={displaySearchRes}
            close={close}
            open={open}
            low={low}
            high={high}
            volume={volume}
        /> : null}

    </div>
}

export default StockPage