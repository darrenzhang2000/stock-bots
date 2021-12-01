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
import requests


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
    'One-Year Price Return',
    'One-Year Return Percentile',
    'Six-Month Price Return',
    'Six-Month Return Percentile',
    'Three-Month Price Return',
    'Three-Month Return Percentile',
    'One-Month Price Return',
    'One-Month Return Percentile',
    'HQM Score',
    'Price-to-Earnings Ratio'
    ]

    grow_dataframe = pd.DataFrame(columns = hqm_columns)
    fall_dataframe = pd.DataFrame(columns = hqm_columns)
    stable_dataframe = pd.DataFrame(columns = hqm_columns)


    #okay, now we add columns to the dataframe, doing our own calculations based on
    #the previous prices        


    response = cachedAPICall(tickers)
    if response.status_code == 200:
        result = response.json()['chart']['result'][0]
        timestamps = result['timestamp']
        comparisons = result['comparisons']

        for stockInfo in comparisons: #now for each stock, grab the relevant info
            ticker = stockInfo['symbol']
            #Yahoo price = stockInfo['close'][4] #we will measure the consistency
            api_call_change = f'https://cloud.iexapis.com/stable/stock/{ticker}/stats/?token=pk_8ecf6ac347c440a98aaaf0884f9cb1d2'
            api_call_price =f'https://cloud.iexapis.com/stable/stock/{ticker}/quote?token=pk_8ecf6ac347c440a98aaaf0884f9cb1d2'
            api_pte = f'https://cloud.iexapis.com/stable/stock/{ticker}/quote?token=pk_8ecf6ac347c440a98aaaf0884f9cb1d2'
            
            pte = requests.get(api_pte).json()
            changes = requests.get(api_call_change).json()
            price = requests.get(api_call_price).json()

            #print(stockInfo) #this is for testing
    

            if(stockInfo['close'][3] - stockInfo['close'][2] < 0
               and stockInfo['close'][2] - stockInfo['close'][1] < 0
               and stockInfo['close'][1] - stockInfo['close'][0] < 0):


                fall_dataframe = fall_dataframe.append( #we then stick price, name, and change percentages into the dataframe
                    pd.Series(
                    [
                        ticker, #'Ticker'
                        price['iexRealtimePrice'], #'today's Price'
                        'N/A',
                        changes['year1ChangePercent'],
                        'N/A',
                        changes['month6ChangePercent'],
                        'N/A',
                        changes['month3ChangePercent'],
                        'N/A',
                        changes['month1ChangePercent'],
                        'N/A',
                        'N/A',
                        pte['peRatio']
                    ],
                        index = hqm_columns),
                        ignore_index = True
                )

            elif(stockInfo['close'][3] - stockInfo['close'][2] > 0
               and stockInfo['close'][2] - stockInfo['close'][1] > 0
               and stockInfo['close'][1] - stockInfo['close'][0] > 0):

                grow_dataframe = grow_dataframe.append( #we then stick price, name, and change percentages into the dataframe
                    pd.Series(
                    [
                        ticker, #'Ticker'
                        price['iexRealtimePrice'], #'today's Price'
                        'N/A',
                        changes['year1ChangePercent'],
                        'N/A',
                        changes['month6ChangePercent'],
                        'N/A',
                        changes['month3ChangePercent'],
                        'N/A',
                        changes['month1ChangePercent'],
                        'N/A',
                        'N/A',
                        pte['peRatio']
                    ],
                        index = hqm_columns),
                        ignore_index = True
                )
            else:
                stable_dataframe = stable_dataframe.append( #we then stick price, name, and change percentages into the dataframe
                    pd.Series(
                    [
                        ticker, #'Ticker'
                        price['iexRealtimePrice'], #'today's Price'
                        'N/A',
                        changes['year1ChangePercent'],
                        'N/A',
                        changes['month6ChangePercent'],
                        'N/A',
                        changes['month3ChangePercent'],
                        'N/A',
                        changes['month1ChangePercent'],
                        'N/A',
                        'N/A',
                        pte['peRatio']
                    ],
                        index = hqm_columns),
                        ignore_index = True
                )



        time_periods = [ #this time periods is just to make it so we can loop at line 125
            'One-Year',
            'Six-Month',
            'Three-Month',
            'One-Month'   
        ]

        for row in fall_dataframe.index:
            for time_period in time_periods:                #calculate return percentile for each price return
                fall_dataframe.fillna(0,inplace=True) #in case it's empty
                change_col = f'{time_period} Price Return'  
                percentile_col = f'{time_period} Return Percentile'
                fall_dataframe.loc[row, percentile_col] = score( fall_dataframe[change_col] , fall_dataframe.loc[row, change_col] )/100

        for row in grow_dataframe.index:
            for time_period in time_periods:                #calculate return percentile for each price return
                grow_dataframe.fillna(0,inplace=True)
                change_col = f'{time_period} Price Return'  
                percentile_col = f'{time_period} Return Percentile'
                grow_dataframe.loc[row, percentile_col] = score( grow_dataframe[change_col] , grow_dataframe.loc[row, change_col] )/100
        
        for row in stable_dataframe.index:
            for time_period in time_periods:                #calculate return percentile for each price return
                stable_dataframe.fillna(0,inplace=True)
                change_col = f'{time_period} Price Return'  
                percentile_col = f'{time_period} Return Percentile'
                stable_dataframe.loc[row, percentile_col] = score( stable_dataframe[change_col] , stable_dataframe.loc[row, change_col] )/100
        


        #now we average out all the return percentiles and rank them
        for row in fall_dataframe.index:
            momentum_percentiles = [] #save all percentile scores in this list and grab the mean of all of it
            for time_period in time_periods:
                momentum_percentiles.append(fall_dataframe.loc[row, f'{time_period} Return Percentile'])
            fall_dataframe.loc[row, 'HQM Score'] = mean(momentum_percentiles)

        for row in grow_dataframe.index:
            momentum_percentiles = [] #save all percentile scores in this list and grab the mean of all of it
            for time_period in time_periods:
                momentum_percentiles.append(grow_dataframe.loc[row, f'{time_period} Return Percentile'])
            grow_dataframe.loc[row, 'HQM Score'] = mean(momentum_percentiles)

        for row in stable_dataframe.index:
            momentum_percentiles = [] #save all percentile scores in this list and grab the mean of all of it
            for time_period in time_periods:
                momentum_percentiles.append(stable_dataframe.loc[row, f'{time_period} Return Percentile'])
            stable_dataframe.loc[row, 'HQM Score'] = mean(momentum_percentiles)


        #so now their hqm scores and their price to earnings ratio
        #are both, known. Now we go into the second step of our
        #filtering process
        #so now we lok at their price return over time, starting with fall
        #note: compare hqm to s&p 500 sotcks

        fall_dataframe.sort_values('HQM Score', ascending = False, inplace = True)

        hqm_half = math.floor(len(fall_dataframe['Ticker'])/2)   
        
        #get request and put in hash table

        
        #for row in fall_dataframe.index:
            #if row < hqm_half:
                #sell stock
                #see if quantity is 0, if so, post, if not then put

        
    #okay, talk with Darren, figure out 
    #how to delete, add to stock database
    #adn how to update money


        grow_dataframe.sort_values('HQM Score', ascending = False, inplace = True)

        stable_dataframe.sort_values('HQM Score', ascending = False, inplace = True)
       

        #so for those that are falling, we see if they are below price to market
        #if that's the case, sell all, if not, hold

        #if rising, check if price to market is positive, if so, buy 1, if not, just hold

        #if stable, buy the top and sell the bottom

        #okay, do comparisons, then split it all into growing, stagnating
        #and shrinking

        
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

        # print(fall_dataframe)
        # print(grow_dataframe)
        # print(stable_dataframe)

        # writer = pd.ExcelWriter('momentum_strategy.xlsx', engine='xlsxwriter')
        # stable_dataframe.to_excel(writer, sheet_name = "Momentum Strategy", index = False)
        # writer.save()
        #note: have to find a proper way to print it all
        # writer = pd.ExcelWriter('momentum_strategy.xlsx', engine='xlsxwriter')
        # hqm_dataframe.to_excel(writer, sheet_name = "Momentum Strategy", index = False)


stockActions(['GOOGL', 'NIO', 'ZM', 'ASAN']) #okay, Apple's strange but it works
