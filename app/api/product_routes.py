from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Product, db
from app.forms import ProductForm
from datetime import date

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


@product_routes.route('/new', methods=['POST'])
# @login_required
def post_new_product():
    form = ProductForm()
    data = request.get_json()
    print('DATA:', data)
    # print('FORM DATA:',form.data)
    owner_id = session.get('user_id')
    form['csrf_token'].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_product = Product(
            owner_id = owner_id,
            name = data['name'],
            description = data['description'],
            price = data['price'],
            preview_img = data['preview_img'],
            created_at = date.today(),
            updated_at = date.today()
        )
    # print('newProduct->', new_product)
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    return form.errors
