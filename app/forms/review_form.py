from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length

class ReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), Length(min=3, max=255, message='Review must be between 3 and 255 characters')])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    submit = SubmitField('Submit')
