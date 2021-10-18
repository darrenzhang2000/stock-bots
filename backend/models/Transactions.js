

/*
class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stock_ticker= db.Column(db.String(1000))
    quantity = db.Column(db.Integer)
    action = db.Column(db.String(1000))
    price = db.Column(db.Float)
    total_price = db.Column(db.Float) #quantity times price
    date_time = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


*/