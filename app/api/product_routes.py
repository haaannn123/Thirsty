from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
    all_products = Product.query.all()
    response = [one_product.to_dict() for one_product in all_products]
    return response


@product_routes.route('/<int:id>')
def get_product_by_id(id):
    print(id)
    one_product = Product.query.get(id)
    print(one_product)
    product = one_product.to_dict()
    return product

