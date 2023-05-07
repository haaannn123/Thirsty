from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField, StringField, SubmitField, SelectField, BooleanField, DecimalField
from wtforms.validators import DataRequired, NumberRange, URL, Length
from ..api.aws_helpers import ALLOWED_EXTENSIONS


class ProductForm(FlaskForm):
    # id = IntegerField
    # owner_id = IntegerField('Owner Id', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=255, message='Name must be between 3 and 255 characters')])
    description = StringField('Description', validators=[DataRequired(), Length(min=30, max=255, message='Description must be between       30 and 255 characters')])
    price = DecimalField('Price', places=2, rounding=None, number_format=3, validators=[DataRequired(), NumberRange(min=1)])
    preview_img = StringField('Preview Image', validators=[DataRequired(), URL(require_tld=True)])
    submit = SubmitField('Submit')
