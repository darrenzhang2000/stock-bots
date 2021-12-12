import axios from 'axios'

const getTrackedStocks = async (email) => {
    var headers = {
        'accept': 'application/json',
    };

    var data = {
        email: email,
    }

    var options = {
        method: 'GET',
        url: `${process.env.REACT_APP_BACKEND_API}/trackedStocks/?email=${email}`,
        headers: headers,
        params: data
    };

    let tickers = []
    await axios(options).then(res => {
        console.log(res, res.data)
        tickers = res.data.trackedStocks.map(stock => stock.ticker)
    })
    return tickers

}

export const runTradingAlgorithm = async () => {
    getTrackedStocks('testuser@gmail.com').then(
        tickers => {
            console.log('tracked tickers', tickers)
            setTimeout(() => {
                console.log('waiting 50 secs')

                runTradingAlgorithm()
            }, 500000)
        }
    )
}
