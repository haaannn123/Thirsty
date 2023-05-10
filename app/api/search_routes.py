from flask import Blueprint
from app.models import Product
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)


@search_routes.route('/<string:search_terms>')
def search(search_terms):

    print('INTIAL SEARCH TERMS', search_terms)

    search_terms = search_terms.split()

    print("fsdfsdfsdfsfsfs", search_terms)

    search_matched_products =[]


    for term in search_terms:

        print('GJGJHGJHGJHGKHJGKJ', term)

        ## the or_() method from SQLAlchemy to combine two filter conditions using the OR operator
        ## This query creates two filter conditions using the ilike() method to perform a case-INSENSITIVE search for search_terms in the name and description fields of the Product table. These conditions are then combined using the or_() method, which results in a query that matches records where either condition is true. Finally, the all() method is called to execute the query and return all matching records.

        term_matched_products = Product.query.filter(or_(Product.name.ilike(f'%{term}%'), Product.description.ilike(f'%{term}%'))).all()

        search_matched_products.extend(term_matched_products)


    ## cast results to a set to eliminate multiple query results of the same product
    unique_search_results = set(search_matched_products)

    search_results_to_dict = [product.to_dict() for product in unique_search_results]

    # print(search_results_to_dict)

    return search_results_to_dict
