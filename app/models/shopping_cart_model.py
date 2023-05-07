from .db import db
from datetime import datetime

class Shopping_Cart(db.Model):
    __tablename__ = "shopping_carts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    user_cart = db.relationship("User", back_populates="cart_user")
    product_cart = db.relationship("Product", back_populates="cart_product")
