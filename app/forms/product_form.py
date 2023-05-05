from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, SelectField, BooleanField, DecimalField
from wtforms.validators import DataRequired, NumberRange, URL, Length

# class ProductForm(FlaskForm):
#     id = IntegerField
#     owner_id
#     name
#     desription
#     price
#     preview_img
#     created_at
#     updated_at
#     submit
