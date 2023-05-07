from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField, StringField, SubmitField, SelectField, BooleanField, DecimalField
from wtforms.validators import DataRequired, NumberRange, URL, Length
from ..api.aws_helpers import ALLOWED_EXTENSIONS

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





# For Ash
preview_img = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
