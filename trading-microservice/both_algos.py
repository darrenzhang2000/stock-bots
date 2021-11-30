import requests
import collections
from statistics import mean
from functools import lru_cache
#from dotenv import load_dotenv
import os
import numpy as np
import pandas as pd
import requests
import math
from scipy.stats import percentileofscore as score
import xlsxwriter
from statistics import mean

#load_dotenv()

# Caching api calls to reduce api calls. Will remove when deployed.
# @lru_cache(None)
def cachedAPICall(tickers):
    headers = {
        'accept': 'application/json',
        'X-API-KEY': "Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva",
    }

    comparisons = ",".join(tickers)

    params = (
        ('comparisons', comparisons),
        ('range', '1wk'),
        ('region', 'US'),
        ('interval', '1d'),
        ('lang', 'en'),
        ('events', 'div,split'),
    )

    response = requests.get('https://yfapi.net/v8/finance/chart/AAPL', headers=headers, params=params)
    return response


class StockAction:
    def __init__(self, ticker, fiveDayAverage, lastBusinessDayClosePrice, action):
        self.ticker = ticker
        self.fiveDayAverage = fiveDayAverage
        self.lastBusinessDayClosePrice = lastBusinessDayClosePrice
        self.action = action

    def __str__(self):
        formatString = "Ticker: {}, fiveDayAverage: {}, lastBusinessDayClosePrice: {}, action: {}"
        return formatString.format(self.ticker, self.fiveDayAverage, self.lastBusinessDayClosePrice, self.action)


def makeStockDecision(avgPrice, prevPrice):
    if prevPrice >= 1.05 * avgPrice:
        return "sell"
    elif prevPrice <= .95 * avgPrice:
        return "buy"
    else:
        return "hold"


def stockActions(tickers):
    stockActionHt = {}  # {'GOOGL': 'buy', 'APPL': 'hold'}

    hqm_columns = [ #this is for measuring return consistency
    'Ticker',
    'Price',
    'Number of Shares to Buy',
    'One-Day Price Return',
    'One-Day Return Percentile',
    'Two-Day Price Return',
    'Two-Day Return Percentile',
    'Three-Day Price Return',
    'Three-Day Return Percentile',
    'Four-Day Price Return',
    'Four-Day Return Percentile',
    'HQM Score'
    ]

    hqm_dataframe = pd.DataFrame(columns = hqm_columns)
    #okay, now we add columns to the dataframe, doing our own calculations based on
    #the previous prices        


    response = cachedAPICall(tickers)
    if response.status_code == 200:
        result = response.json()['chart']['result'][0]
        timestamps = result['timestamp']
        comparisons = result['comparisons']

        for stockInfo in comparisons: #now for each stock, grab the relevant info
            ticker = stockInfo['symbol']
            price = stockInfo['close'][4] #we grab the change percent for the past 4 days
            day1ChangePercent = (stockInfo['close'][4] - stockInfo['close'][3]) / stockInfo['close'][4]
            day2ChangePercent = (stockInfo['close'][4] - stockInfo['close'][2]) / stockInfo['close'][4]
            day3ChangePercent = (stockInfo['close'][4] - stockInfo['close'][1]) / stockInfo['close'][4]           
            day4ChangePercent = (stockInfo['close'][4] - stockInfo['close'][0]) / stockInfo['close'][4]                       

            hqm_dataframe = hqm_dataframe.append( #we then stick price, name, and change percentages into the dataframe
                pd.Series(
                [
                    ticker, #'Ticker'
                    price, #'today's Price'
                    'N/A',
                    day1ChangePercent,
                    'N/A',
                    day2ChangePercent,
                    'N/A',
                    day3ChangePercent,
                    'N/A',
                    day4ChangePercent,
                    'N/A',
                    'N/A'
                ],
                    index = hqm_columns),
                    ignore_index = True
            )

        time_periods = [ #this time periods is just to make it so we can loop at line 125
            'One-Day',
            'Two-Day',
            'Three-Day',
            'Four-Day'    
        ]

        for row in hqm_dataframe.index:
            for time_period in time_periods:                #calculate return percentile for each price return
                change_col = f'{time_period} Price Return'  
                percentile_col = f'{time_period} Return Percentile'
                hqm_dataframe.loc[row, percentile_col] = score( hqm_dataframe[change_col] , hqm_dataframe.loc[row, change_col] )/100
                
        #now we average out all the return percentiles and rank them
        for row in hqm_dataframe.index:
            momentum_percentiles = [] #save all percentile scores in this list and grab the mean of all of it
            for time_period in time_periods:
                momentum_percentiles.append(hqm_dataframe.loc[row, f'{time_period} Return Percentile'])
            hqm_dataframe.loc[row, 'HQM Score'] = mean(momentum_percentiles)

        hqm_dataframe.sort_values('HQM Score', ascending = False, inplace = True)
        #note: here we split the stocks based on performance

        half_length = math.floor(len(hqm_dataframe['Ticker'])/2)
        #we want half the length


        
        #okay so here we know the higher growers, now we 
        #figure which ones we buy and sell
        #so basic thing should be if top half of hqm score, buy 
        #if in lower half of hqm score, hold
        #if growth is close to zero or even negative, then sell
        #the degree to which we buy or sell depends on price to earnings
        # so if i have a stock with a negative growth, i'll grab it into a new list
        #where i'll grab it's price to earnings, when i have that, i'll
        #sell all of it if it's above, or sell half if it's below

        #return comparisons
        # for stockInfo in comparisons:
        #     print(stockInfo)
        #     ticker = stockInfo['symbol']
        #     fiveDayClosePrices = list(filter(lambda p: p, stockInfo['close']))

        print(hqm_dataframe) #note: have to find a proper way to print it all
        # writer = pd.ExcelWriter('momentum_strategy.xlsx', engine='xlsxwriter')
        # hqm_dataframe.to_excel(writer, sheet_name = "Momentum Strategy", index = False)


stockActions(['GOOGL', 'NIO', 'ZM', 'ASAN']) #okay, Apple's strange but it works
