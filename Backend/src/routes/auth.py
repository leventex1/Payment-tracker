import flask
import src.views.auth as auth_views

auth = flask.Blueprint('auth', __name__, url_prefix='/auth')

auth.add_url_rule('/login', view_func=auth_views.login_user, methods=['POST'])