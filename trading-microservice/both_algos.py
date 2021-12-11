import requests
import collections
from statistics import mean
from functools import lru_cache
import os
import numpy as np
import pandas as pd
import requests
import math
from scipy.stats import percentileofscore as score
import xlsxwriter

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

    headers = { #this is to summon the data from the database, response will have a .json() that I can summon to get data
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
    }
    params = {
        'email': 'testuser@gmail.com'
    }
    database = requests.get('http://localhost:8000/ownedStocks/',
                            headers=headers, params=params)
    #print(database)
    #print(database.json())

    stockChanges = {} #this will save the name and number of the user's stocks in a hash table
    for i in range( len(database.json()['ownedStocks']) ):
        #print(database.json()['ownedStocks'][i]['ticker'])
        stockChanges[ database.json()['ownedStocks'][i]['ticker'] ] = database.json()['ownedStocks'][i]['quantity']['$numberDecimal']



    #print(stockChanges)
    # stockChanges['MSFT'] = int(stockChanges['MSFT'])/2

    hqm_columns = [ #this is for measuring return consistency
    'Ticker',
    'Price',
    'One-Year Price Return',
    'Six-Month Price Return',
    'Three-Month Price Return',
    'One-Month Price Return',
    'Reason',
    'Decision'
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
            #print(ticker)
            #Yahoo price = stockInfo['close'][4] #we will measure the consistency
            #print(f'https://cloud.iexapis.com/stable/stock/{ticker}/quote?token=pk_8ecf6ac347c440a98aaaf0884f9cb1d2')
            
            api_call_change = f'https://cloud.iexapis.com/stable/stock/{ticker}/stats/?token=pk_8ecf6ac347c440a98aaaf0884f9cb1d2'
            api_call_price =f'https://cloud.iexapis.com/stable/stock/{ticker}/quote?token=pk_8ecf6ac347c440a98aaaf0884f9cb1d2'
            
            #print(api_call_change)

            #print( requests.get(api_call_change) )
            #print("hi")

            changes = requests.get(api_call_change).json()
            price = requests.get(api_call_price).json()


            #print(stockInfo) #this is for testing
    
            
            if(stockInfo['close'][3] - stockInfo['close'][2] > 0
               and stockInfo['close'][2] - stockInfo['close'][1] > 0
               and stockInfo['close'][1] - stockInfo['close'][0] > 0):


                fall_dataframe = fall_dataframe.append( #we then stick price, name, and change percentages into the dataframe
                    pd.Series(
                    [
                        ticker, #'Ticker'
                        price['iexRealtimePrice'], #'today's Price'
                        changes['year1ChangePercent'],
                        changes['month6ChangePercent'],
                        changes['month3ChangePercent'],
                        changes['month1ChangePercent'],
                        'N/A',
                        'N/A'
                    ],
                        index = hqm_columns),
                        ignore_index = True
                )

            elif(stockInfo['close'][3] - stockInfo['close'][2] < 0
               and stockInfo['close'][2] - stockInfo['close'][1] < 0
               and stockInfo['close'][1] - stockInfo['close'][0] < 0):

                grow_dataframe = grow_dataframe.append( #we then stick price, name, and change percentages into the dataframe
                    pd.Series(
                    [
                        ticker, #'Ticker'
                        price['iexRealtimePrice'], #'today's Price'
                        changes['year1ChangePercent'],
                        changes['month6ChangePercent'],
                        changes['month3ChangePercent'],
                        changes['month1ChangePercent'],
                        'N/A',
                        'N/A'
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
                        changes['year1ChangePercent'],
                        changes['month6ChangePercent'],
                        changes['month3ChangePercent'],
                        changes['month1ChangePercent'],
                        'N/A',
                        'N/A'
                    ],
                        index = hqm_columns),
                        ignore_index = True
                )


    

        #note these next few lines grab the saved money values
        url = "http://localhost:8000/portfolios?email=testuser@gmail.com"
        payload={}
        headers = {
        'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        }

        bank = requests.request("GET", url, headers=headers, data=payload)
        #print(bank.json())
        

        #print(bank.json()['portfolios'][0]['total']['$numberDecimal']) # -= liquid_currency
        #note total from this call is bad, make your own
        #total_to_return = float( bank.json()['portfolios'][0]['total']['$numberDecimal'] )
        spending_power_to_return = float( bank.json()['portfolios'][0]['spendingPower']['$numberDecimal'] )

        for row in fall_dataframe.index: #update the chnage to amount of stocks in stock actions
            orig_stock = int( stockChanges[fall_dataframe.loc[row, 'Ticker']] ) #this searches stockChanges for the amount
            stockChanges[ fall_dataframe.loc[row, 'Ticker'] ] = 0
            spending_power_to_return +=  ( float( orig_stock) ) * fall_dataframe.loc[row, 'Price']
            #note create liquid currency before this
            #create total since last run
            #total_to_return -= liquid_currency



        for row in stable_dataframe.index:
            decision = 0 #decision will help decide the fate of the stock
            avg_past = (stable_dataframe.loc[row, 'One-Year Price Return'] + 
                       stable_dataframe.loc[row, 'Six-Month Price Return']  +
                       stable_dataframe.loc[row, 'Three-Month Price Return']  +
                       stable_dataframe.loc[row, 'One-Month Price Return']  )
            #print(avg_past)
            if(avg_past < 0):
                decision = decision - 1
            elif(avg_past > 0):
                decision = decision + 1
            else: #just in case it adds up to 0
                decision = decision + 0
            #if it ends up as 0, sell half immediately

            stable_dataframe.loc[row, 'Decision'] = decision

        for row in stable_dataframe.index: #update the chnage to amount of stocks in stock actions
            if stable_dataframe.loc[row, 'Decision'] == 1:
                orig_stock = int( stockChanges[stable_dataframe.loc[row, 'Ticker']] )
                stock_in_half = math.floor( orig_stock / 2  )
                stockChanges[ stable_dataframe.loc[row, 'Ticker'] ] =  int(stockChanges[ stable_dataframe.loc[row, 'Ticker'] ]) - stock_in_half
                spending_power_to_return +=  ( float( orig_stock) ) * stable_dataframe.loc[row, 'Price']
                #add cash in stock
                #total_to_return -= liquid_currency

            else:
                orig_stock = int( stockChanges[stable_dataframe.loc[row, 'Ticker']] )
                stockChanges[ stable_dataframe.loc[row, 'Ticker'] ] = 0
                spending_power_to_return +=  ( float( orig_stock - stock_in_half) ) * stable_dataframe.loc[row, 'Price']
                #okay, we now updated the amount of stocks we have left and got the money from that
                #now we update the bank to show that that money is now liquid
                #total_to_return -= liquid_currency
                
        #okay, now return to database


        for row in grow_dataframe.index:
            decision = 0 #decision will help decide the fate of the stock
            avg_past = (grow_dataframe.loc[row, 'One-Year Price Return'] + 
                       grow_dataframe.loc[row, 'Six-Month Price Return']  +
                       grow_dataframe.loc[row, 'Three-Month Price Return']  +
                       grow_dataframe.loc[row, 'One-Month Price Return']  )
            #print(avg_past)
            if(avg_past < 0):
                decision = decision - 1
            elif(avg_past > 0):
                decision = decision + 1
            else: #just in case it adds up to 0
                decision = decision + 0
            #if it ends up as 0, sell half immediately

            grow_dataframe.loc[row, 'Decision'] = decision

        #and now we judge the rising ones and maybe buy some
        #we want to be careful, need to make new dataframe to add
        #collect only the least reliable stocks and drop them

        #make divvied up cash to see how much we can sell for each
        if(len(grow_dataframe.index) != 0 and spending_power_to_return != 0):
            divvied_up_cash = spending_power_to_return / len(grow_dataframe.index)
            for row in grow_dataframe.index:
                orig_stock = int( stockChanges[grow_dataframe.loc[row, 'Ticker']] )
                new_amount_to_buy = math.floor(divvied_up_cash/grow_dataframe.loc[i, 'Price'])
                spending_power_to_return -=  (new_amount_to_buy * grow_dataframe.loc[i, 'Price'])
                stockChanges[grow_dataframe.loc[row, 'Ticker']] = int(stockChanges[grow_dataframe.loc[row, 'Ticker']] + new_amount_to_buy)
            # great, now from line 81, we can manipulate all the stocks
        #okay, we have the # of shares we can buy for each, now we do that                


        url = "http://localhost:8000/ownedStocks/purchase"

        for key in stockChanges:
            
            payload=f'email=testuser%40gmail.com&ticker={key}&purchaseAmt={stockChanges[key]}'
            headers = {
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva',
            'Content-Type': 'application/x-www-form-urlencoded'
            }

            response = requests.request("PUT", url, headers=headers, data=payload)

            #print(response.text)
        

        url = "http://localhost:8000/portfolios/"

        payload=f'email=testuser%40gmail.com&amount={spending_power_to_return}'
        headers = {
        'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva',
        'Content-Type': 'application/x-www-form-urlencoded'
        }

        response = requests.request("PUT", url, headers=headers, data=payload)

        print(response.text)

       
    #okay, talk with Darren, figure out 
    #how to delete, add to stock database
    #adn how to update money


       
       
        #return comparisons
        # for stockInfo in comparisons:
        #     print(stockInfo)
        #     ticker = stockInfo['symbol']
        #     fiveDayClosePrices = list(filter(lambda p: p, stockInfo['close']))

        print(fall_dataframe)
        print(grow_dataframe)
        print(stable_dataframe)

        # writer = pd.ExcelWriter('momentum_strategy.xlsx', engine='xlsxwriter')
        # stable_dataframe.to_excel(writer, sheet_name = "Momentum Strategy", index = False)
        # writer.save()
        #note: have to find a proper way to print it all
        

stockActions(['GOOGL', 'TSLA', 'FB', 'AAPL', 'MSFT']) #okay, Apple's strange but it works
