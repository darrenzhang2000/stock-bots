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
import glob

#we want all the excl files so we get path
# path = os.getcwd()
# path += "/histdata"
# csv_files = glob.glob(os.path.join(path, "*.csv"))

#okay so we will use the bottom loop to just put all the excel files
#into their own variables,

#or just grab them individually and just repeat everything 4 times for each 
#specific one

#nested for loop so each 

#okay, so do for(1 - 4) and if: it's one, A_stock_xl = MSFT.xl, if 2 A_stock = FB
#OR
#put read all of them, then put each of them in a series
#df = [df1, df2, df3]
#good, news. i only have to grab the last 6 months rather than 5 years
# 

G_stock = pd.read_csv('GOOGL.csv')
F_stock = pd.read_csv('FB.csv')
M_stock = pd.read_csv('MSFT.csv')
T_stock = pd.read_csv('TSLA.csv')

csv_files = [G_stock, F_stock, M_stock, T_stock]




liquid_cash = 10000
total_money = 10000
#note start here --- > stockChanges = {''} make stock changes hash table 4 msft, etc like in both algos
cash_in_stock = 0

daily_report_columns = ['Date', 'Spending Power', 'Price', 'Quantity', 'Total', 'Report']

report_dataframe = pd.DataFrame(columns = daily_report_columns)

#okay, for every day
for day in range(1100, len(G_stock)):
    #print(A_stock.loc[i, 'Date'])
    #simulate what this algo does with one stock
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

    #here is where first for loop goes
    #for each csv file in the list of csv files
    for A_stock_xl in csv_files:
        #this is because i have to drop the file location and the .csv from the excel file
        ticker = str(A_stock_xl).replace(".csv", "")

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
                    yr1change,
                    mo6change,
                    mo3change,
                    mo1change,
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
                    yr1change,
                    mo6change,
                    mo3change,
                    mo1change,
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
                    yr1change,
                    mo6change,
                    mo3change,
                    mo1change,
                    'N/A', #pte['peRatio'], note, can't get pte ratio
                    'N/A'
                ],
                    index = hqm_columns),
                    ignore_index = True
            )

    #now we measure how decent their past has been
    

    #if it's falling, we just want to sell

    for row in fall_dataframe.index:
        orig_stock = A_stock_amount #okay, i'm only updating 1 stock
        A_stock_amount = 0
        cash_in_stock = 0
        liquid_cash +=  float(orig_stock) * fall_dataframe.loc[row, 'Price']
        total_money = liquid_cash

        report_dataframe = report_dataframe.append(
            pd.Series(
            [
                A_stock_xl.loc[day, 'Date'],
                liquid_cash,
                fall_dataframe.loc[row, 'Price'],
                A_stock_amount,
                total_money,
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
            cash_in_stock = stock_in_half * stable_dataframe.loc[row, 'Price']
            #liquid cash is made larger by what we sold
            liquid_cash +=  ( float( orig_stock - stock_in_half) ) * stable_dataframe.loc[row, 'Price']
            total_money = cash_in_stock + liquid_cash

            report_dataframe = report_dataframe.append(
            pd.Series(
            [
                A_stock_xl.loc[day, 'Date'],
                liquid_cash,
                stable_dataframe.loc[row, 'Price'],
                A_stock_amount,
                total_money,
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
                liquid_cash,
                stable_dataframe.loc[row, 'Price'],
                A_stock_amount,
                total_money,                    
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
                liquid_cash,
                grow_dataframe.loc[row, 'Price'],
                A_stock_amount,
                total_money,
                f"Bought {new_amount_to_buy} of {grow_dataframe.loc[row, 'Ticker']} for {grow_dataframe.loc[row, 'Price']} because it's been growing for the past 3 days. New total is {total_money}"
            ],
                index = daily_report_columns),
                ignore_index = True
            )
            # grow_dataframe.loc[row, 'Reason'] = f"Bought {new_amount_to_buy} of {grow_dataframe.loc[row, 'Ticker']} for {grow_dataframe.loc[row, 'Price']} because it's been growing for the past 3 days. New total is {total_money}"
            # print(grow_dataframe.loc[row, 'Reason'])



print(total_money)
print(report_dataframe)
        
writer = pd.ExcelWriter( '6_month_test_report.xlsx', engine='xlsxwriter')
report_dataframe.to_excel(writer, sheet_name = "daily_report", index = False)
writer.save()
