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


    Cproduct1 = Product(
        owner_id=4,
        name='Agua de Jamaica',
        description='Agua de Jamaica is a refreshing drink made from hibiscus flowers, sugar, and water. It has a tart and sweet flavor and is perfect for hot summer days.',
        price=3.99,
        preview_img='https://cdn7.kiwilimon.com/recetaimagen/3630/640x640/15252.jpg.webp',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct2 = Product(
        owner_id=4,
        name='Michelada',
        description='Michelada is a popular Mexican beer cocktail made with beer, lime juice, hot sauce, and Worcestershire sauce. It is served in a salt-rimmed glass and is perfect for brunch or as a refreshing drink on a hot day.',
        price=6.99,
        preview_img='https://www.muydelish.com/wp-content/uploads/2023/04/michelada-beer.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct3 = Product(
        owner_id=4,
        name='Paloma',
        description='Paloma is a refreshing grapefruit-based cocktail that is popular in Mexico. It is made with grapefruit soda, tequila, and lime juice and is perfect for a summer day.',
        price=7.99,
        preview_img='https://assets.epicurious.com/photos/6282a5e032116283cbeb3628/4:3/w_4981,h_3736,c_limit/Paloma_RECIPE_051222_34035.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct4 = Product(
        owner_id=4,
        name='Tequila Sunrise',
        description='Tequila Sunrise is a classic cocktail made with tequila, orange juice, and grenadine. It is a sweet and fruity drink that is perfect for brunch or as a happy hour cocktail.',
        price=8.99,
        preview_img='https://recipetineats.com/wp-content/uploads/2019/09/Tequila-Sunrise.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct5 = Product(
        owner_id=4,
        name='Margarita',
        description='Margarita is a classic cocktail made with tequila, lime juice, and triple sec. It is a refreshing and tangy drink that is perfect for happy hour or as a summer cocktail.',
        price=9.99,
        preview_img='https://www.seriouseats.com/thmb/rkmijvOtxOQyH3D8n2q8uc67XNk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__04__20150323-cocktails-vicky-wasik-margarita-c84b154e757d43688de15dc8f8ca0de9.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct6 = Product(
        owner_id=4,
        name='Mexican Hot Chocolate',
        description='Mexican Hot Chocolate is a rich and decadent drink made with melted chocolate, milk, and cinnamon. It is a perfect treat for cold winter days.',
        price=4.99,
        preview_img='https://d1e3z2jco40k3v.cloudfront.net/-/media/project/oneweb/mccormick-us/mccormick/recipe-categories/c/1376x774/creamy_mexican_hot_chocolate2_1376_774.jpg?rev=8b8f469613c5421ebde5deaebced4c18&vd=20210922T165016Z&hash=A452A79809973FCA9A16E92930DEB7FD',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct7 = Product(
        owner_id=4,
        name='Ponche',
        description='Ponche is a traditional Mexican fruit punch that is typically served during the Christmas season. It is made with a variety of fruits, including apples, pears, and oranges, and is spiced with cinnamon and cloves.',
        price=6.99,
        preview_img='https://www.mexicoinmykitchen.com/wp-content/uploads/2016/11/Traditional-Mexican-Christmas-fruit-punch-recipe-2e.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct8 = Product(
        owner_id=4,
        name='Tepache',
        description='Tepache is a traditional Mexican drink made from fermented pineapple and piloncillo (unrefined brown sugar). It is sweet, tangy, and slightly fizzy.',
        price=3.99,
        preview_img='https://www.mexicoinmykitchen.com/wp-content/uploads/2013/07/Tepache-pineapple-brew-recipe-1.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct9 = Product(
        owner_id=4,
        name='Pulque',
        description='Pulque is an alcoholic beverage made from fermented agave sap. It has a slightly sour and yeasty taste, and is usually served chilled.',
        price=6.99,
        preview_img='https://oasishoteles.com/blog/wp-content/uploads/2021/11/bebida-mexicana-pulque.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct10 = Product(
        owner_id=4,
        name='Mezcal',
        description='Mezcal is a distilled alcoholic beverage made from the agave plant. It has a smoky flavor and is often served with orange slices and salt.',
        price=19.99,
        preview_img='https://www.mezcalreviews.com/wp-content/uploads/2021/01/trader-joes-espada-pequena-espadin-mezcal.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct11 = Product(
        owner_id=4,
        name='Tequila',
        description='Tequila is a distilled alcoholic beverage made from the blue agave plant. It is most commonly consumed as a shot with salt and lime, or in a margarita cocktail.',
        price=24.99,
        preview_img='https://cdn.shopify.com/s/files/1/0882/6838/products/olmeca-blanco_8f7fedcb-13d3-4662-8d96-cfe6bace9334.png?v=1519688503',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct12 = Product(
        owner_id=4,
        name='Cerveza',
        description='Cerveza is the Spanish word for beer. Mexico is known for its light, refreshing beers such as Corona, Modelo, and Pacifico.',
        price=2.99,
        preview_img='https://cdn.shoplightspeed.com/shops/611413/files/29067172/corona-extra-cerveza-mexico-6pk-beer-bottles.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    Cproduct13 = Product(
            owner_id = 4,
            name = 'Rompope',
            description = 'Rompope is a traditional Mexican eggnog-like drink made with milk, eggs, sugar, vanilla, and cinnamon. It is usually served cold and can be enjoyed as a dessert or as a holiday drink.',
            price = 6.99,
            preview_img = 'https://rusticfamilyrecipes.com/wp-content/uploads/2022/11/Recipe-Card-Rompope-4.jpg',
            created_at = date.today(),
            updated_at = date.today()
    )

    Cproduct14 = Product(
            owner_id = 4,
            name = 'Champurrado',
            description = 'Champurrado is a warm and thick Mexican drink made with masa harina (corn flour), chocolate, cinnamon, and sugar. It is often served during the winter holidays and can be enjoyed as a dessert or a breakfast drink.',
            price = 3.99,
            preview_img = 'https://www.goya.com/media/3196/champurrado-thick-mexican-hot-chocolate.jpg?quality=80',
            created_at = date.today(),
            updated_at = date.today()
    )

    Cproduct15 = Product(
            owner_id = 4,
            name = 'Jarritos',
            description = 'Jarritos is a brand of popular Mexican soft drinks that come in a variety of fruity flavors. They are made with real sugar and are a refreshing alternative to traditional carbonated sodas.',
            price = 2.49,
            preview_img = 'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/odusqltx/bf1a3726-25a2-45e3-b8f0-f042659809de.jpg',
            created_at = date.today(),
            updated_at = date.today()
    )


    # db.session.add(product1)
    # db.session.add(product2)
    # db.session.add(product3)
    all_reviews = [product1, product2, product3, Cproduct1, Cproduct2, Cproduct3, Cproduct4, Cproduct5, Cproduct6, Cproduct7, Cproduct8, Cproduct9, Cproduct10, Cproduct11, Cproduct12, Cproduct13, Cproduct14, Cproduct15]
    add_reviews = [db.session.add(review) for review in all_reviews]

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
