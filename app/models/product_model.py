from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Float, nullable=False)
    preview_img = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship("User", back_populates="products")
    shop_product = db.relationship("Shop", cascade="all, delete-orphan", back_populates="product_shop")
    review_product = db.relationship("Review", cascade="all, delete-orphan", back_populates="product_review")
    cart_product = db.relationship("Shopping_Cart", cascade="all, delete-orphan", back_populates="product_cart")
    image_product = db.relationship("Product_Image", cascade="all, delete-orphan", back_populates="product_image")




    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'preview_img': self.preview_img,
            'created_at': self.created_at,
            'update_at': self.updated_at
        }
