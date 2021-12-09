'''
For certain stocks (tech stocks),
for start date April 2020, grab stock opening prices everyday all the way to Nov 1,
store prices in a csv
compare how much money is made at the end
'''
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
from datetime import datetime
from dateutil.relativedelta import relativedelta




#okay, commands like this will give me my rows as long
#as i give a good date
# https://stackoverflow.com/questions/17071871/how-do-i-select-rows-from-a-dataframe-based-on-column-values


#start_date = (date =2017-12-01)

#okay, measure how much money is gained over first 5 stocks
#and give percentage of increase
#at the end, sell all

#so I need starting cash
A_stock_xl = pd.read_csv('A.csv')


liquid_cash = 10000
total_money = 10000

A_stock_amount = math.floor( liquid_cash / A_stock_xl.loc[1000, 'Close'] )
cash_in_stock = (A_stock_amount * A_stock_xl.loc[1000, 'Close'])
liquid_cash = liquid_cash - (A_stock_amount * A_stock_xl.loc[1000, 'Close'])
total_money = liquid_cash + cash_in_stock
# print(total_money)
# print(A_stock_amount)
# print(cash_in_stock)
# print(liquid_cash)
# print(A_stock.loc[400, 'Close'])
# print(A_stock_amount)
# print(liquid_cash)

#print(len(A_stock_xl))

# for day in range(1, len(A_stock_xl)):
#     print(str(A_stock_xl.loc[day - 1, 'Date']) + " " + str(A_stock_xl.loc[day, 'Close']))

daily_report_columns = ['Date', 'Report']

report_dataframe = pd.DataFrame(columns = daily_report_columns)


for day in range(1000, len(A_stock_xl)):
    #print(A_stock.loc[i, 'Date'])
    #simulate what this algo does with one stock
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
    'Reason',
    'Decision'
    ]

    grow_dataframe = pd.DataFrame(columns = hqm_columns)
    fall_dataframe = pd.DataFrame(columns = hqm_columns)
    stable_dataframe = pd.DataFrame(columns = hqm_columns)

    ticker = 'A'

    a_year_ago = day - (52 * 5) #this is an estimate, since stock market is only
        #open on weekdays, so 52 of those should be a year ago
    six_months_ago = day - (26 * 5)
    three_months_ago = day - (13 * 5)
    one_month_ago = day - (4 * 5)

    #it's new value - orig value / orig value * 100
    yr1change = ( (A_stock_xl.loc[day, 'Close'] - A_stock_xl.loc[a_year_ago, 'Close']) / A_stock_xl.loc[a_year_ago, 'Close'] ) * 100
    mo6change = ( (A_stock_xl.loc[day, 'Close'] - A_stock_xl.loc[six_months_ago, 'Close']) / A_stock_xl.loc[six_months_ago, 'Close'] ) * 100
    mo3change = ( (A_stock_xl.loc[day, 'Close'] - A_stock_xl.loc[three_months_ago, 'Close']) / A_stock_xl.loc[three_months_ago, 'Close'] ) * 100
    mo1change = ( (A_stock_xl.loc[day, 'Close'] - A_stock_xl.loc[one_month_ago, 'Close']) / A_stock_xl.loc[one_month_ago, 'Close'] ) * 100


    if((A_stock_xl.loc[day - 4, 'Close'] - A_stock_xl.loc[day - 3, 'Close'] ) > 0
               and (A_stock_xl.loc[day - 3, 'Close'] - A_stock_xl.loc[day - 2, 'Close'] ) > 0
               and (A_stock_xl.loc[day - 2, 'Close'] - A_stock_xl.loc[day - 1, 'Close'] ) > 0):
       
        #grab and find the year percentage changes for past prices
        #note this is the index

        fall_dataframe = fall_dataframe.append( #we then stick price, name, and change percentages into the dataframe
            pd.Series(
            [
                ticker, #'Ticker'
                A_stock_xl.loc[day, 'Close'], #'today's Price'
                'N/A',
                yr1change,
                'N/A',
                mo6change,
                'N/A',
                mo3change,
                'N/A',
                mo1change,
                'N/A',
                'N/A',
                'N/A', #pte['peRatio'], note, can't get pte ratio
                'N/A'
            ],
                index = hqm_columns),
                ignore_index = True
        )
    elif((A_stock_xl.loc[day - 4, 'Close'] - A_stock_xl.loc[day - 3, 'Close'] ) < 0
               and (A_stock_xl.loc[day - 3, 'Close'] - A_stock_xl.loc[day - 2, 'Close'] ) < 0
               and (A_stock_xl.loc[day - 2, 'Close'] - A_stock_xl.loc[day - 1, 'Close'] ) < 0):
   
        grow_dataframe = grow_dataframe.append( #we then stick price, name, and change percentages into the dataframe
            pd.Series(
            [
                ticker, #'Ticker'
                A_stock_xl.loc[day, 'Close'], #'today's Price'
                'N/A',
                yr1change,
                'N/A',
                mo6change,
                'N/A',
                mo3change,
                'N/A',
                mo1change,
                'N/A',
                'N/A',
                'N/A', #pte['peRatio'], note, can't get pte ratio
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
                A_stock_xl.loc[day, 'Close'], #'today's Price'
                'N/A',
                yr1change,
                'N/A',
                mo6change,
                'N/A',
                mo3change,
                'N/A',
                mo1change,
                'N/A',
                'N/A',
                'N/A', #pte['peRatio'], note, can't get pte ratio
                'N/A'
            ],
                index = hqm_columns),
                ignore_index = True
        )

    #now we measure how decent their past has been
    

    #if it's falling, we just want to sell

    for row in fall_dataframe.index:
        orig_stock = A_stock_amount
        A_stock_amount = 0
        cash_in_stock = 0
        liquid_cash +=  float(orig_stock) * fall_dataframe.loc[row, 'Price']
        total_money = liquid_cash

        report_dataframe = report_dataframe.append(
            pd.Series(
            [
                A_stock_xl.loc[day, 'Date'],
                f"Sold all {orig_stock} of stock {fall_dataframe.loc[row, 'Ticker']} at {fall_dataframe.loc[row, 'Price']} because it's been falling for 3 consecutive days. New total is {total_money}"
            ],
                index = daily_report_columns),
                ignore_index = True
        )
        #fall_dataframe.loc[row, 'Reason'] = f"Sold all {orig_stock} of stock {fall_dataframe.loc[row, 'Ticker']} at {fall_dataframe.loc[row, 'Price']} because it's been falling for 3 consecutive days. New total is {total_money}"
        #print(fall_dataframe.loc[row, 'Reason'])


    #now we decide the fate of the stable stocks
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

            stable_dataframe.loc[row, 'Decision'] = decision

    #okay we took an estimate of its past, so now we decide how much we sell
    for row in stable_dataframe.index:
        if stable_dataframe.loc[row, 'Decision'] == 1:
            #it has a decent past, so i'll only sell half
            orig_stock = A_stock_amount
            stock_in_half = math.floor( orig_stock / 2  )
            #subtract A_stock_amount by the half we sold
            A_stock_amount -= stock_in_half
            #the current cash in the stock is now what we have left in the stocks
            cash_in_stock = A_stock_amount * stable_dataframe.loc[row, 'Price']
            #liquid cash is made larger by what we sold
            liquid_cash +=  ( float( orig_stock - stock_in_half) ) * stable_dataframe.loc[row, 'Price']
            total_money = cash_in_stock + liquid_cash

            report_dataframe = report_dataframe.append(
            pd.Series(
            [
                A_stock_xl.loc[day, 'Date'],
                f"Sold half, {stock_in_half}, of stock {stable_dataframe.loc[row, 'Ticker']} at {stable_dataframe.loc[row, 'Price']} because it's platued for the past 3 days and it has an okay recent history. New total is {total_money}"         
            ],
                index = daily_report_columns),
                ignore_index = True
            )
            #stable_dataframe.loc[row, 'Reason'] = f"Sold half, {stock_in_half}, of stock {stable_dataframe.loc[row, 'Ticker']} at {stable_dataframe.loc[row, 'Price']} because it's platued for the past 3 days and it has an okay recent history. New total is {total_money}"
            #print(stable_dataframe.loc[row, 'Reason'])
           
            #we still need to buy, so we'll push the updated numbers at the end
        else:
            orig_stock = A_stock_amount
            A_stock_amount = 0
            cash_in_stock = 0
            liquid_cash +=  float( orig_stock) * stable_dataframe.loc[row, 'Price']
            total_money = liquid_cash
            
            report_dataframe = report_dataframe.append(
            pd.Series(
            [
                A_stock_xl.loc[day, 'Date'],
                f"Sold all {A_stock_amount}, of stock {stable_dataframe.loc[row, 'Ticker']} at {stable_dataframe.loc[row, 'Price']} because it's platued for the past 3 days, but it has a poor recent history. New total is {total_money}"       
            ],
                index = daily_report_columns),
                ignore_index = True
            )

            #stable_dataframe.loc[row, 'Reason'] = f"Sold all {A_stock_amount}, of stock {stable_dataframe.loc[row, 'Ticker']} at {stable_dataframe.loc[row, 'Price']} because it's platued for the past 3 days, but it has a poor recent history. New total is {total_money}"
            #print(stable_dataframe.loc[row, 'Reason'])

    
    #if it's growing for the past 3 days, we want to buy as much as possible
    if(len(grow_dataframe.index) != 0 and liquid_cash != 0):
        divvied_up_cash = liquid_cash / len(grow_dataframe.index)
        for row in grow_dataframe.index:
            orig_stock = A_stock_amount
            new_amount_to_buy = math.floor(divvied_up_cash/grow_dataframe.loc[row, 'Price'])
            liquid_cash -= ( new_amount_to_buy * grow_dataframe.loc[row, 'Price'])
            A_stock_amount = A_stock_amount + new_amount_to_buy
            cash_in_stock = A_stock_amount * grow_dataframe.loc[row, 'Price']
            total_money = liquid_cash + cash_in_stock

            report_dataframe = report_dataframe.append(
            pd.Series(
            [
                A_stock_xl.loc[day, 'Date'],
                f"Bought {new_amount_to_buy} of {grow_dataframe.loc[row, 'Ticker']} for {grow_dataframe.loc[row, 'Price']} because it's been growing for the past 3 days. New total is {total_money}"           
            ],
                index = daily_report_columns),
                ignore_index = True
            )
            # grow_dataframe.loc[row, 'Reason'] = f"Bought {new_amount_to_buy} of {grow_dataframe.loc[row, 'Ticker']} for {grow_dataframe.loc[row, 'Price']} because it's been growing for the past 3 days. New total is {total_money}"
            # print(grow_dataframe.loc[row, 'Reason'])



print(total_money)
print(report_dataframe)
        
writer = pd.ExcelWriter('test_report.xlsx', engine='xlsxwriter')
report_dataframe.to_excel(writer, sheet_name = "daily_report", index = False)
writer.save()
