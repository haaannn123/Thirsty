from app.models import db, Shopping_Cart, environment, SCHEMA
from sqlalchemy.sql import text


def seed_carts():
    shopping_cart1 = Shopping_Cart(
        user_id = 1,
        product_id = 1,
        quantity = 3
    )

    shopping_cart2 = Shopping_Cart(
        user_id = 1,
        product_id = 2,
        quantity= 5
    )

    all_shopping_carts = [shopping_cart1, shopping_cart2]
    add_shopping_cart = [db.session.add(cart) for cart in all_shopping_carts]
    db.session.commit()


def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping carts"))

    db.session.commit()
