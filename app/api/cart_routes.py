from flask import Blueprint, session, request, jsonify
from app.models import Shopping_Cart, Product, db
from flask_login import login_required

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
@login_required
def get_shopping_cart():
    owner_id = session.get('_user_id')
    carts = Shopping_Cart.query.filter_by(user_id=owner_id).all()
    # print('CARTS', carts)
    return {"carts": [cart.to_dict() for cart in carts]}

@cart_routes.route('/', methods=['POST'])
@login_required
def add_to_cart():
    owner_id = session.get('_user_id')
    id = request.json.get('product_id')
    product_quantity = request.json.get('quantity')
    # print('REQUEST', request.json, product_quantity)
    cartProduct = Product.query.get(id)
    item_in_user_cart = Shopping_Cart.query.filter(Shopping_Cart.product_id == id).filter(Shopping_Cart.user_id == owner_id).first()

    # print("DOES PRODUCT EXIST IN USER CART--------------", item_in_user_cart.to_dict())

    #print ("OWNER ID--------------------", owner_id)

    if item_in_user_cart is None:
        cart_item = Shopping_Cart(user_id=owner_id, product_id=cartProduct.id, quantity=product_quantity)
        db.session.add(cart_item)
        db.session.commit()

        return (cart_item.to_dict())

    else:
        item_in_user_cart.quantity += product_quantity
        db.session.add(item_in_user_cart)
        db.session.commit()
        return item_in_user_cart.to_dict()


@cart_routes.route('/', methods=['PUT'])
@login_required
def update_cart_item_quantity():
    data = request.get_json()
    quantity = data['quantity']
    product_id = data['item']['id']
    owner_id = session.get('_user_id')
    # id = request.json.get('product_id')
    # print("DATA ------------", data)
    # print('REQUEST', request.json)
    item_in_user_cart = Shopping_Cart.query.filter(Shopping_Cart.product_id == product_id).filter(Shopping_Cart.user_id == owner_id).first()

    # print("DOES PRODUCT EXIST IN USER CART--------------", item_in_user_cart.to_dict())

    #print ("OWNER ID--------------------", owner_id)

    # if item_in_user_cart is None:
    #     cart_item = Shopping_Cart(user_id=owner_id, product_id=cartProduct.id, quantity=1)
    #     db.session.add(cart_item)
    #     db.session.commit()

    #     return (cart_item.to_dict())

    item_in_user_cart.quantity = quantity
    db.session.add(item_in_user_cart)
    db.session.commit()
    return item_in_user_cart.to_dict()



@cart_routes.route('/deleteSingleItem', methods=['DELETE'])
@login_required
def delete_item_from_cart():
    data = request.get_json()
    product_id = data['product_id']
    owner_id = session.get('_user_id')

    print("DELETE ITEM FROM CART", product_id, owner_id)

    item_in_user_cart = Shopping_Cart.query.filter(Shopping_Cart.product_id == product_id).filter(Shopping_Cart.user_id == owner_id).first()

    print("DELETE ITEM FROM CART", item_in_user_cart)


    db.session.delete(item_in_user_cart)
    db.session.commit()

    # carts = Shopping_Cart.query.filter_by(user_id=owner_id).all()
    return {'Message' : "Item deleted from cart"}
