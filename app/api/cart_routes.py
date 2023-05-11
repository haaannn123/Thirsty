from flask import Blueprint, session, request, jsonify
from app.models import Shopping_Cart, Product, db
from flask_login import login_required

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
@login_required
def get_shopping_cart():
    owner_id = session.get('_user_id')
    carts = Shopping_Cart.query.filter_by(user_id=owner_id).all()
    print('CARTS', carts)
    return {"carts": [cart.to_dict() for cart in carts]}

@cart_routes.route('/', methods=['POST'])
@login_required
def add_to_cart():
    owner_id = session.get('_user_id')
    id = request.json.get('product_id')
    # print('REQUEST', request.json)
    cartProduct = Product.query.get(id)
    item_in_user_cart = Shopping_Cart.query.filter(Shopping_Cart.product_id == id).filter(Shopping_Cart.user_id == owner_id).first()

    # print("DOES PRODUCT EXIST IN USER CART--------------", item_in_user_cart.to_dict())

    #print ("OWNER ID--------------------", owner_id)

    if item_in_user_cart is None:
        cart_item = Shopping_Cart(user_id=owner_id, product_id=cartProduct.id, quantity=1)
        db.session.add(cart_item)
        db.session.commit()

        return (cart_item.to_dict())

    else:
        item_in_user_cart.quantity += 1
        db.session.add(item_in_user_cart)
        db.session.commit()
        return item_in_user_cart.to_dict()


