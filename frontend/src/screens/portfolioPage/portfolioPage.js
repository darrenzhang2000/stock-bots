import React, {useEffect} from 'react'
import axios from 'axios'

const PortfolioPage = () => {
    const [ownedStocks, setOwnedStocks] = React.useState([])

    const getOwnedStocks = () => {
        var headers = {
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        var data = {
            email: 'testuser@gmail.com',
        }

        var options = {
            method: 'GET',
            url: 'http://localhost:5000/ownedStocks/',
            headers: headers,
            params: data
        };

        axios(options).then(res => {
            console.log(res)
            console.log(res.data.ownedStocks)
            setOwnedStocks(res.data.ownedStocks)
        })
    }

    useEffect(() => {
        console.log('transactions page')
        getOwnedStocks()
    }, [])

    return (
        <div>
            portfolio page
            {
                ownedStocks.map(stock => <div>
                    ticker: {stock.ticker}                    
                    quantity: {stock.quantity.$numberDecimal}
                </div>)
            }
        </div>
    )
}

export default PortfolioPage