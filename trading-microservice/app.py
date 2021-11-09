import pymongo
from tradingAlgo import stockActions
from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

client = pymongo.MongoClient('mongodb+srv://testuser:testuser123@cluster0.9fxli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client['myFirstDatabase']
users = db['users']

# x = users.find()
# for data in x:
#     print(data)

@app.route('/stockActions', methods=['POST']) # post because get does not accept array
def getStockActions():
    data = request.form.to_dict()
    actions = stockActions(tickers)
    return jsonify(actions)


tickers = ['GOOGL', 'AAPL', 'AMZN', 'NFLX', 'FB']

if __name__ == '__main__':
    app.run(port=8000)