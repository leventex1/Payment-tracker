import flask
from src import db, bcrypt
from src.models import User, AuthUser
import src.utils.auth as auth_utils

def get_all_user():
    
    users: list[User] = db.session.execute(db.select(User)).scalars()

    return { 'users': [
        {
            'created_at': user.created_at,
            'updated_at': user.updated_at,
            'id': user.id,
            'username': user.username
        } for user in users
    ]}, 200


@auth_utils.access_token_required
def get_user():

    user: User = flask.g.user

    return {
        'created_at': user.created_at,
        'updated_at': user.updated_at,
        'id': user.id,
        'username': user.username,
    }, 200


def create_user():

    data: dict = flask.request.json

    if not data.get('email') or not data.get('password') or not data.get('username'):
        return { 'message': 'Invalid form data.' }, 400
    
    found_auth_user: AuthUser = db.session.execute(db.select(AuthUser).filter_by(email=data.get('email'))).scalar()
    if found_auth_user:
        return { 'message': 'User already exist' }, 409

    pw_hash: str = bcrypt.generate_password_hash(data.get('password'))
    auth_user: AuthUser = AuthUser(email=data.get('email'), password=pw_hash)
    db.session.add(auth_user)
    db.session.commit()

    user: User = User(username=data.get('username'), auth_id=auth_user.id)
    db.session.add(user)
    db.session.commit()

    return { 'message': 'User created' }, 200


@auth_utils.access_token_required
def delete_user():
    
    user: User = flask.g.user
    auth_user: AuthUser = user.auth_user

    db.session.delete(user)
    db.session.commit()
    db.session.delete(auth_user)
    db.session.commit()

    return { 'message': 'User has been deleted' }, 200


@auth_utils.access_token_required
def update_user():

    user: User = flask.g.user

    data: dict = flask.request.json
    updated: list[str] = []

    if isinstance(data.get('username'), str) and len(data.get('username')) <= 32:
        user.username = data.get('username')
        updated.append('username')

    db.session.commit()

    return { 'message': 'User has been updated', 'updated': updated }, 200