from flask import Blueprint, session, request, jsonify
from app.models import Shopping_Cart, Product, db

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
def get_shopping_cart():
    owner_id = session.get('_user_id')

    carts = Shopping_Cart.query.filter_by(user_id=owner_id).all()
    print('CARTS', carts)
    return {"carts": [cart.to_dict() for cart in carts]}

@cart_routes.route('/<int:cart_id>/product/<int:product_id>', methods=['POST'])
def add_to_cart(cart_id, product_id):
    cart = Shopping_Cart.query.get(cart_id)
    print('CART', cart)
    product = Product.query.get(product_id)

    if not cart:
        return jsonify({'error': 'Cart not found'}), 404

    if not product:
        return jsonify({'error': 'Product not found'}), 404

    cart.products.append(product)
    db.session.commit()

    return jsonify({'message': 'Product added to cart'})
