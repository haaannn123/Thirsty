from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_products():
    product1 = Product(
        owner_id = 1,
        name = 'Horchata',
        description = 'Horchata is a refreshing, non-alcoholic drink that originated in Valencia, Spain and is popular in many Latin American countries. It is typically made from ground almonds, rice, or a combination of both, and flavored with cinnamon, vanilla, and sugar.',
        price = 4.99,
        preview_img = 'https://www.cookingclassy.com/wp-content/uploads/2019/04/horchata-6.jpg',
        created_at = date.today(),
        updated_at = date.today()
    )

    product2 = Product(
        owner_id = 2,
        name = 'Thai Tea',
        description = 'Thai tea is a popular drink in Thailand and Southeast Asia, known for its vibrant orange color and sweet, creamy flavor. It is typically made from a blend of black tea, spices such as star anise and cinnamon, and condensed milk or evaporated milk.',
        price = 3.99,
        preview_img = 'https://www.aimeemars.com/wp-content/uploads/2020/06/Thai-Iced-Tea-in-Plastic-Cup.jpg',
        created_at = date.today(),
        updated_at = date.today()
    )

    product3 = Product(
        owner_id = 3,
        name = 'Yerba Mate',
        description = 'Yerba mate is a traditional South American drink made by steeping the leaves and twigs of the yerba mate plant in hot water.',
        price = 8.99,
        preview_img = 'https://www.chevronextramile.com/content/uploads/2021/04/Yerba_Mate_RevelBerry_15.5oz.jpg',
        created_at = date.today(),
        updated_at = date.today()
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
