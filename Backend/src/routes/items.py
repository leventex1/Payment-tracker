import flask
import src.views.items as item_views

items = flask.Blueprint('items', __name__, url_prefix='/items')

items.add_url_rule('', view_func=item_views.get_all_items, methods=['GET'])

items.add_url_rule('', view_func=item_views.create_item, methods=['POST'])

items.add_url_rule('/<int:item_id>', view_func=item_views.get_item, methods=['GET'])

items.add_url_rule('/<int:item_id>', view_func=item_views.update_item, methods=['PUT'])

items.add_url_rule('/<int:item_id>', view_func=item_views.delete_item, methods=['DELETE'])
