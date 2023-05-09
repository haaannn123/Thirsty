from flask import Blueprint, session
from app.models import Shop


shop_routes = Blueprint('shop', __name__, '')

@shop_routes.route('/')
def get_curr_user_shop():
    """
    Query for all the shops the belong to the current user
    """
    owner_id = session.get('_user_id')
    print("OWNER ID:", owner_id)
    shops = Shop.query.filter_by(owner_id=owner_id).all()
    print('SHOPS', shops)
    return {"shops": [shop.to_dict() for shop in shops]}
