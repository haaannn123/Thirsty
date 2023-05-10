from app.models import db, Shop, environment, SCHEMA
from sqlalchemy.sql import text


def seed_shops():
    shop1 = Shop(
        owner_id = 1,
        product_id = 1,
        name = 'Horchata Store!'
    )

    shop2 = Shop(
        owner_id = 2,
        product_id = 2,
        name = 'Thai Tea Store!'
    )

    shop3 = Shop(
        owner_id = 3,
        product_id = 3,
        name = 'Yerba Mate Store!'
    )

    all_shops = [shop1, shop2, shop3]
    add_shops = [db.session.add(shop) for shop in all_shops]
    db.session.commit()


def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shops"))

    db.session.commit()
