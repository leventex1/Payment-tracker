import flask
from src import db, bcrypt
from src.models import AuthUser
import src.utils.auth as auth_utils

def login_user():

    data: dict = flask.request.json

    if not data.get('email') or not data.get('password'):
        return { 'message': 'Invalid form data' }, 400
    
    auth_user: AuthUser = db.session.execute(db.select(AuthUser).filter_by(email=data.get('email'))).scalar()

    if not auth_user:
        return { 'message': 'User not found' }, 404
    
    if not bcrypt.check_password_hash(auth_user.password, data.get('password')):
        return { 'message': 'Ivalid authentication' }, 403
    
    access_token = auth_utils.encode_access_token(auth_user.user.id)
    return { 'message': 'Successfull authentication', 'data': { 'access_token': access_token } }, 200