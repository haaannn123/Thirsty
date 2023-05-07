from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, SelectField, BooleanField, DecimalField
from wtforms.validators import DataRequired, NumberRange, URL, Length

class ProductForm(FlaskForm):
    # id = IntegerField
    # owner_id = IntegerField('Owner Id', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = DecimalField('Price', validators=[DataRequired()])
    preview_img = StringField('Preview Image', validators=[DataRequired()])
    submit = SubmitField('Submit')
