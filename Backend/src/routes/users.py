import flask
import src.views.users as user_views

users = flask.Blueprint('users', __name__, url_prefix='/users')

users.add_url_rule('/all', view_func=user_views.get_all_user, methods=['GET'])

users.add_url_rule('', view_func=user_views.get_user, methods=['GET'])

users.add_url_rule('', view_func=user_views.create_user, methods=['POST'])

users.add_url_rule('', view_func=user_views.delete_user, methods=['DELETE'])

users.add_url_rule('', view_func=user_views.update_user, methods=['PUT'])