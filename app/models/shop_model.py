from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Shop(db.Model):
    __tablename__ = 'shops'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
    name = db.Column(db.String(50), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    user_shop = db.relationship("User", back_populates="shop_user")
    product_shop = db.relationship("Product", back_populates="shop_product")


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'product_id': self.product_id,
            'name': self.name,
            'created_at': self.created_at,
            'update_at': self.updated_at
        }
