from flask import Blueprint
from app.models import Product
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)


@search_routes.route('/<string:search_terms>')
def search(search_terms):


    ## the or_() method from SQLAlchemy to combine two filter conditions using the OR operator
    ## This query creates two filter conditions using the ilike() method to perform a CASE-INSENSITIVE search for search_terms in the name and description fields of the Product table. These conditions are then combined using the or_() method, which results in a query that matches records where either condition is true. Finally, the all() method is called to execute the query and return all matching records.
    products_search_matches = Product.query.filter(or_(Product.name.ilike(f'%{search_terms}%'), Product.description.ilike(f'%{search_terms}%'))).all()

    ## cast results in a set to eliminate multiple query result from the same item
    unique_search_results = set(products_search_matches)

    search_results_to_dict = [product.to_dict() for product in unique_search_results]

    # print(search_results_to_dict)

    return {'search_results': search_results_to_dict}
