# import pymongo
# from tradingAlgo import stockActions
from flask import Flask, jsonify
# import json
from flask_cors import CORS
# from both_algos import stockActions
# from accessDb import getPortfolios
import requests
from both_algos import stockActions
import time
app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'


def getPortfolios():
    url = "http://localhost:5000/portfolios/all"

    payload={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload).json()

    portfolios = response['portfolios']

    return portfolios

def runAlgoJob():
    portfolios = getPortfolios()
    emails = [p["email"] for p in portfolios]
    for email in emails:
        stockActions(['GOOGL', 'TSLA', 'FB', 'MSFT'], email)

    time.sleep(86400)
    runAlgoJob()



if __name__ == '__main__':
    runAlgoJob()
    app.run(port=8000)