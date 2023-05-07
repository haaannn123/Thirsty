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

@product_routes.route('/', methods=['POST'])
@login_required
def post_new_product():
    form = ProductForm()
    owner_id = session.get('user_id')
    form['csrf_token'].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_product = Product(
            owner_id = form[owner_id],
            name = form['name'],
            description = form['description'],
            price = form['price'],
            preview_img = form['preview_img'],
            created_at = date.today(),
            updated_at = date.today()
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    return form.errors
