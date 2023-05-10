from flask import Blueprint, session, request, jsonify
from app.models import Shopping_Cart, Product, db

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
def get_shopping_cart():
    owner_id = session.get('_user_id')
    carts = Shopping_Cart.query.filter_by(user_id=owner_id).all()
    print('CARTS', carts)
    return {"carts": [cart.to_dict() for cart in carts]}

@cart_routes.route('/', methods=['POST'])
def add_to_cart():
    owner_id = session.get('_user_id')
    id = request.json.get('product_id')
    # print('REQUEST', request.json)
    cartProduct = Product.query.get(id)

    cart_item = Shopping_Cart(user_id=owner_id, product_id=cartProduct.id, quantity=1)
    db.session.add(cart_item)
    db.session.commit()

    return (cart_item.to_dict())
