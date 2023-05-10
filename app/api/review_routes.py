from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, User, db
from app.forms.review_form import ReviewForm


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/user/<int:user_id>')
@login_required
def get_reviews_by_user_id(user_id):
    user_reviews = Review.query.filter_by(user_id=user_id).all()
    print('----------USER REVIEWS---------', user_reviews)
    reviews = [review.to_dict() for review in user_reviews]

    return reviews


@review_routes.route('/product/<int:product_id>')
def get_reviews_by_product_id(product_id):
    product_reviews = Review.query.filter(Review.product_id.like(product_id)).order_by(Review.created_at.desc()).all()
    reviews = [review.to_dict() for review in product_reviews]

    for review in reviews:
        userId = review['user_id']
        user = User.query.get(userId)
        review_user = user.to_dict()
        review['User_info'] = review_user

    return reviews

@review_routes.route('/new/product/<int:product_id>', methods=['POST'])
@login_required
def create_review_for_product_by_id(product_id):
    form = ReviewForm()
    owner_id = session.get('_user_id')
    print('FORM DATA:',form.data, product_id)
    form['csrf_token'].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_review = Review(
            user_id = owner_id,
            product_id = product_id,
            review = form.data['review'],
            rating = form.data['rating']
        )

        print('---------NEW REVIEW---------', new_review)

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return form.errors
