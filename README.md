# stock-bots

## Instructions for using deployed app
Go to https://arcane-bayou-24810.herokuapp.com/

## Instructions for running locally

### Frontend
Naviate to the frontend directory: ```cd frontend```   
Install Dependencies: ```npm i```  

Create a file named .env
Grab an api key from yahoo finance following the instructions in the following link and store it inside the .env file in a variable called REACT_APP_YAHOOFINANCE_API_KEY: https://www.yahoofinanceapi.com/tutorial 

Set the backend port like this: REACT_APP_BACKEND_API=http://localhost:5000 

The contents of the .env file should be something like:
```
REACT_APP_YAHOOFINANCE_API_KEY=ENTER_YOUR_API_KEY_HERE
REACT_APP_BACKEND_API=http://localhost:5000
``` 

Run frontend: ```npm start```

### Backend
Open a new terminal and navigate to the backend directory: ```cd backend```  

Install Dependencies: ```npm i```  

Create a mongoDB Atlas account following the instructions here: https://docs.atlas.mongodb.com/getting-started/ 

In your MongoDB Atlas account, create the following collections: ![image](https://user-images.githubusercontent.com/44158788/145899535-435a15f9-2614-486a-8de0-970435001858.png)

Create a file named .env 
Add the connection string of the database you've just created to a variable called CONNECTION_STRING in the .env file. 

The contents of the .env file should be something like: 
```
CONNECTION_STRING = YOUR_MONGO_DB_CONNECTION_STRING
```

Run backend: ```node index.js```

### trading-microservice
Open a new terminal and navigate to the trading-microservice directory: ```cd trading-microservice```  

Install Dependencies: ```pip3 install -r requirements.txt``` 

Create file named .env
Store the Yahoo Finance API key you've created earlier in a variable called YAHOO_FINANCE_API_KEY 

Create an iex api key and store it a variable called IEX_API_KEY: https://iexcloud.io/docs/api/  

Store the port as follows: BACKEND_API=http://localhost:5000 

The contents of the .env file should be something like: 
```
YAHOO_FINANCE_API_KEY=YOUR_YAHOO_FINANCE_API_KEY 
IEX_API_KEY=YOUR_IEX_API_KEY 
BACKEND_API=http://localhost:5000
```

Run trading-microservice: ```python3 app.py```  

## Instructions for deploying app
Download Heroku: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up 

Deploy our code: 
We need to deploy 3 services to heroku: our frontend, backend and trading-microservice.
Clone the stockbot repo: 
```
git clone git@github.com:darrenzhang2000/stock-bots.git 
```

Navigate into that repo by doing: 
```
cd stock-bots
```
Unhide the hidden git file and remove it (that way we can later push the frontend, backend and trading-microservice onto Github). On the Macbook, the command it cmd+shift+. to unhide.

Now add the frontend, backend and trading-microservice onto Github: https://docs.github.com/en/github/importing-your-projects-to-github/importing-source-code-to-github/adding-an-existing-project-to-github-using-the-command-line



Use the heroku login command to log in to the Heroku CLI: 
```
heroku login
```

Create an app on Heroku, which prepares Heroku to receive your source code.

```
heroku create
```

Push the app to heroku: 
```
git push heroku main
```

Ensure that the app is running: 
```
heroku ps:scale web=1
```

Open the app:
```
heroku open
``` 

Make sure this is done for all 3 repos. 

Set the environmental variables on heroku in a similar fashion as specified in local deployment. https://devcenter.heroku.com/articles/config-vars



