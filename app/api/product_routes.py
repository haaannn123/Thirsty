from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
    """"
    Query for all products route that returns all of the products from the db.
    """
    all_products = Product.query.all()
    response = [one_product.to_dict() for one_product in all_products]
    return response


@product_routes.route('/<int:id>')
def get_product_by_id(id):
    """"
    Query for single product route that retuns a single product from the db.
    """
    print(id)
    one_product = Product.query.get(id)
    product = one_product.to_dict()
    return product
