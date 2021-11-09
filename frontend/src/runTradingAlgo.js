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

// given 
const getStockActions = async (tickers, email) => {
    console.log('getting stock actions', tickers)
    var headers = {
        'accept': 'application/json',
        'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
    };

    var data = {
        email: email,
    }

    var options = {
        method: 'POST',
        url: 'http://localhost:8000/stockActions/',
        headers: headers,
        params: data
    };

    let actionHt = {}
    await axios(options).then(res => {
        console.log(res.data)
    })
}

export const runTradingAlgorithm = async () => {
    getTrackedStocks('testuser@gmail.com').then(
        tickers => {
            setTimeout(() => {
                console.log('waiting 50 secs')
                //getStockActions(tickers, 'testuser@gmail.com')
                runTradingAlgorithm()
            }, 5000)
        }
    )
}
