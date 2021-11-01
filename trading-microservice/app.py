import pymongo
import tradingAlgo

client = pymongo.MongoClient('mongodb+srv://testuser:testuser123@cluster0.9fxli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client['myFirstDatabase']

users = db['users']

x = users.find()
for data in x:
    print(data)


tickers = ['GOOGL', 'AAPL', 'AMZN', 'NFLX', 'FB']

# print(tradingAlgo.stockActions(tickers))