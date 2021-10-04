import requests
import collections

#tickers = ['GOOGL', 'AAPL', 'AMZN', 'NFLX', 'FB']
tickers = ['GOOGL']

def stockActions(tickers):
    # get average closing price for the past 5 business days. 
    # returns "buy" if current price (or price on market close) is 5% 
    # return "buy", "sell" or "hold"

    # https://polygon.io/docs/get_v1_open-close__stocksTicker___date__anchor
    res = []
    StockPrices = collections.namedtuple('StockPrices', ('ticker', 'closing_price'))
    for ticker in tickers:
        print(ticker)
        response = requests.get('https://api.polygon.io/v1/open-close/{}/2020-10-14?adjusted=true&apiKey=APIKEY'.format(ticker))
        if response.status_code == 200:
            closing_price = response.json()['close']
            res.append(StockPrices(ticker, closing_price))
        print(response.status_code, response.json())
    return res


stockActions(tickers)