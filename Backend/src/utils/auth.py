import jwt
import flask
import functools
from src import db
from src.models import User

def encode_access_token(user_id: int) -> str:
    return jwt.encode({ 'user_id': user_id }, flask.current_app.config.get('SECRET'), 'HS256')

# Returns the user_id if the token is valid.
def decode_access_token(token: str) -> int | None:
    try:
        decoded_jwt: dict = jwt.decode(token, flask.current_app.config.get('SECRET'), algorithms=['HS256'])
    except:
        return None
    return decoded_jwt.get('user_id')


def access_token_required(f):
    @functools.wraps(f)
    def decorated_function(*args, **kwargs):

        access_token = flask.request.headers.get('x-access-token')

        if not access_token:
            return { 'message': 'Access token required' }, 400

        user_id = decode_access_token(token=access_token)

        if not user_id:
            return { 'message': 'Unauthorized usage' }, 401
        
        user: User = db.session.execute(db.select(User).filter_by(id=user_id)).scalar()
        if not user:
            return { 'message': 'User not found' }, 404
        
        flask.g.user = user
        
        return f(*args, **kwargs)
    
    return decorated_function