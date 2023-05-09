from flask import Blueprint, session, request
from app.models import Shopping_Cart, db

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
def get_shopping_cart():
    owner_id = session.get('_user_id')

    carts = Shopping_Cart.query.filter_by(user_id=owner_id).all()
    print('CARTS', carts)
    return {"carts": [cart.to_dict() for cart in carts]}
