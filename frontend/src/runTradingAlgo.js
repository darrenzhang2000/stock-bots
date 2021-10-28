import axios from 'axios'

const getTrackedStocks = async (email) => {
    var headers = {
        'accept': 'application/json',
        'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
    };

    var data = {
        email: email,
    }

    var options = {
        method: 'GET',
        url: 'http://localhost:5000/ownedStocks/',
        headers: headers,
        params: data
    };

    let tickers = []
    await axios(options).then(res => {
        tickers = res.data.ownedStocks.map(ownedStock => ownedStock.ticker)
    })
    return tickers

}

const getStockActions = (tickers) => {
    console.log('getting stock actions', tickers)
    
}

export const runTradingAlgorithm = async () => {
    getTrackedStocks('testuser@gmail.com').then(
        tickers => {
            setTimeout(() => {
                console.log('waiting 5 secs')
                getStockActions(tickers)
                runTradingAlgorithm()
            }, 50000)
        }
    )
}
