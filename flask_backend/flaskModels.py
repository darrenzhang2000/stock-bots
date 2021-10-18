from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stock_ticker= db.Column(db.String(1000))
    quantity = db.Column(db.Integer)
    action = db.Column(db.String(1000))
    price = db.Column(db.Double)
    total_price = db.Column(db.Double) #quantity times price
    date_time = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    transactions = db.relationship('Transactions')
    #note to self, out foreign key here fro transactions