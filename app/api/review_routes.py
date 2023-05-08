from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, User, db


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:product_id>/reviews')
def get_reviews_by_product_id(product_id):
    product_reviews = Review.query.filter(Review.product_id.like(product_id)).order_by(Review.created_at.desc()).all()
    reviews = [review.to_dict() for review in product_reviews]

    for review in reviews:
        userId = review['user_id']
        user = User.query.get(userId)
        review_user = user.to_dict()
        review['User_info'] = review_user

    return reviews
