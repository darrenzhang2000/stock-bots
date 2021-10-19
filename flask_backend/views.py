from flask import Blueprint, render_template, request, flash, jsonify

#views is for basically all pages not sign in or log in

views = Blueprint('views', __name__)

@views.route('/') #this is home page
def home():
    #start with adding users to backend
    #create post request feature that adds a stock transaction into database
    #use get request to grab all trades made by userid(email) and for a specific trade
    #found in building api section 
    #https://realpython.com/api-integration-in-python/
    return render_template("home.html")
