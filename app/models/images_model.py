from .db import db, environment, SCHEMA
from datetime import datetime

class Product_Image(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    product_image = db.relationship("Product", back_populates="image_product")


    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'image': self.image,
            'created_at': self.created_at,
            'update_at': self.updated_at
        }
