import React from 'react'

const StockInfo = props => {
    const { close, high, low, open, volume } = props
    console.log('stock info ')
    return <div>
        <p>Close price: {close}</p>
        <p>High price: {high}</p>
        <p>Low price: {low}</p>
        <p>Open price: {open}</p>
        <p>Volumne price: {volume}</p>
    </div>
}

export default StockInfo