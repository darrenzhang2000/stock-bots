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

#we want all the excel files in hist file so we get path
path = os.getcwd()
path += "/histdata"
csv_files = glob.glob(os.path.join(path, "*.csv"))

#since some stocks will lose money and some will gain, we will track the gain and loss of each so we know overall how much we make
overall_gain = 0



#for every csv file, it will run an individual report
#basically for each stock, it will simulate as if the algorithm has run for just that one stock for about 3 years
#so it's as if a user had only had one stock for us to manage, and they let it run for 3 years without change
for current_xl in csv_files:
    A_stock_xl = pd.read_csv(current_xl)

    #when the code is here, that means a new 5 year file will be run, so we resest all these values
    liquid_cash = 10000
    total_money = 10000
    A_stock_amount = 0
    cash_in_stock = 0

    csv_index = 0
    #this is added to whenever
    daily_report_columns = ['ID', 'Date', 'Spending Power', 'Price', 'Quantity', 'Total', 'Report']

    report_dataframe = pd.DataFrame(columns = daily_report_columns)

    for day in range(500, len(A_stock_xl)):
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

        #this is because i have to drop the file location and the .csv from the excel file
        ticker = ( str(current_xl).split("/")[-1] ).replace(".csv", "")

        a_year_ago = day - (52 * 5) #this is an estimate, since stock market is only
            #open on weekdays, so 52 of those groups of 5 should be a year ago
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
            orig_stock = A_stock_amount
            A_stock_amount = 0
            cash_in_stock =  0
            liquid_cash +=  float(orig_stock) * fall_dataframe.loc[row, 'Price']
            total_money = liquid_cash + cash_in_stock

            given_reason =  f"Sold all {orig_stock} of stock {fall_dataframe.loc[row, 'Ticker']} at {fall_dataframe.loc[row, 'Price']} because it's been falling for 3 consecutive days. New total is {total_money}"
            action = "SELL"
            if orig_stock == 0:
                action = "HOLD"
                given_reason = f"Didn't do anything for {fall_dataframe.loc[row, 'Ticker']} since it's falling and we own none of its stocks"
            

            report_dataframe = report_dataframe.append(
                pd.Series(
                [
                    csv_index,
                    A_stock_xl.loc[day, 'Date'],
                    liquid_cash,
                    fall_dataframe.loc[row, 'Price'],
                    A_stock_amount,
                    total_money,
                    given_reason
                ],
                    index = daily_report_columns),
                    ignore_index = True
            )
            csv_index += 1
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
                if orig_stock == 1:
                    A_stock_amount = 0
                    cash_in_stock = 0
                    liquid_cash += stable_dataframe.loc[row, 'Price']
                else:
                    A_stock_amount -= stock_in_half
                    #the current cash in the stock is now what we have left in the stocks
                    cash_in_stock = ( float( A_stock_amount - stock_in_half) ) * stable_dataframe.loc[row, 'Price']
                    #liquid cash is made larger by what we sold
                    liquid_cash +=  ( float( stock_in_half) ) * stable_dataframe.loc[row, 'Price']
                total_money = cash_in_stock + liquid_cash

                given_reason = f"Sold half, {stock_in_half}, of stock {stable_dataframe.loc[row, 'Ticker']} at {stable_dataframe.loc[row, 'Price']} because it's platued for the past 3 days and it has an okay recent history. New total is {total_money}"
                action = "SELL"
                if orig_stock == 0:
                    action = "HOLD"
                    given_reason = f"Didn't do anything for {stable_dataframe.loc[row, 'Ticker']} since it's stable and has a decent history and we have own none of its stocks"

                report_dataframe = report_dataframe.append(
                pd.Series(
                [
                    csv_index,
                    A_stock_xl.loc[day, 'Date'],
                    liquid_cash,
                    stable_dataframe.loc[row, 'Price'],
                    A_stock_amount,
                    total_money,
                    given_reason
                ],
                    index = daily_report_columns),
                    ignore_index = True
                )
                csv_index += 1
                #stable_dataframe.loc[row, 'Reason'] = f"Sold half, {stock_in_half}, of stock {stable_dataframe.loc[row, 'Ticker']} at {stable_dataframe.loc[row, 'Price']} because it's platued for the past 3 days and it has an okay recent history. New total is {total_money}"
                #print(stable_dataframe.loc[row, 'Reason'])
            
                #we still need to buy, so we'll push the updated numbers at the end
            else:
                orig_stock = A_stock_amount
                A_stock_amount = 0
                cash_in_stock = 0
                liquid_cash +=  float( orig_stock) * stable_dataframe.loc[row, 'Price']
                total_money = liquid_cash + cash_in_stock

                given_reason = f"Sold all {orig_stock}, of stock {stable_dataframe.loc[row, 'Ticker']} at {stable_dataframe.loc[row, 'Price']} because it's platued for the past 3 days, but it has a poor recent history. New total is {total_money}"
                action = "SELL"
                if orig_stock == 0:
                    action = "HOLD"
                    given_reason = f"Didn't do anything for {stable_dataframe.loc[row, 'Ticker']} since it's stable and has a bad history and we have own none of its stocks"

                
                report_dataframe = report_dataframe.append(
                pd.Series(
                [
                    csv_index,
                    A_stock_xl.loc[day, 'Date'],
                    liquid_cash,
                    stable_dataframe.loc[row, 'Price'],
                    A_stock_amount,
                    total_money,   
                    given_reason                 
                ],
                    index = daily_report_columns),
                    ignore_index = True
                )
                csv_index += 1

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
                cash_in_stock = ( A_stock_amount * grow_dataframe.loc[row, 'Price'])
                total_money = liquid_cash + cash_in_stock

                given_reason = f"Bought {new_amount_to_buy} of {grow_dataframe.loc[row, 'Ticker']} for {grow_dataframe.loc[row, 'Price']} because it's been growing for the past 3 days. New total is {total_money}"
                action = "BUY"

                if new_amount_to_buy == 0:
                    given_reason = f"Didn't do buy any of {grow_dataframe.loc[row, 'Ticker']} even though it's growing because we don't currently have the money"
                    action = "HOLD"

                report_dataframe = report_dataframe.append(
                pd.Series(
                [
                    csv_index,
                    A_stock_xl.loc[day, 'Date'],
                    liquid_cash,
                    grow_dataframe.loc[row, 'Price'],
                    A_stock_amount,
                    total_money,
                    given_reason
                ],
                    index = daily_report_columns),
                    ignore_index = True
                )
                csv_index += 1
                # grow_dataframe.loc[row, 'Reason'] = f"Bought {new_amount_to_buy} of {grow_dataframe.loc[row, 'Ticker']} for {grow_dataframe.loc[row, 'Price']} because it's been growing for the past 3 days. New total is {total_money}"
                # print(grow_dataframe.loc[row, 'Reason'])


    overall_gain += total_money - 10000 
    print(total_money)
    print(report_dataframe)
            
    writer = pd.ExcelWriter(str(current_xl).replace(".csv", "") + '_test_report.xlsx', engine='xlsxwriter')
    report_dataframe.to_excel(writer, sheet_name = "daily_report", index = False)
    writer.save()

print(overall_gain)
    # end_path = os.getcwd()
    # end_path += "/backtesting_results"
    # report_dataframe.to_csv(end_path, str(current_xl).replace(".csv", "") + ' report_for_backtest.csv')
