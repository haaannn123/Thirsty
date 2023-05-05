from .db import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    preview_img = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    users = db.relationship("User", back_populates="products")

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
