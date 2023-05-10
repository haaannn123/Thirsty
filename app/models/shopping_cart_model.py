from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Shopping_Cart(db.Model):
    __tablename__ = "shopping_carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    user_cart = db.relationship("User", back_populates="cart_user")
    product_cart = db.relationship("Product", back_populates="cart_product")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'created_at': self.created_at,
            'update_at': self.updated_at
        }
