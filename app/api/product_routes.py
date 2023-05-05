from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Products

products_routes = Blueprint('products', __name__)
