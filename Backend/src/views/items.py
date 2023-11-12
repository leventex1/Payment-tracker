import flask
import src.utils.auth as auth_utils
from src import db
import src.models as models


@auth_utils.access_token_required
def get_all_items():

    user: models.User = flask.g.user

    return { 'data': [
        {
            'created_at': item.created_at,
            'updated_at': item.updated_at,
            'id': item.id,
            'name': item.name,
            'amount': item.amount,
            'recursion': item.recursion
        } for item in user.items
    ]}, 200


@auth_utils.access_token_required
def create_item():

    user: models.User = flask.g.user

    data: dict = flask.request.json

    if not data.get('name') or not data.get('amount') or not data.get('recursion'):
        return { 'message': 'Invalid form data' }, 400
    
    item: models.Item = models.Item(
        name=data.get('name'), 
        amount=data.get('amount'), 
        recursion=data.get('recursion'), 
        user_id=user.id)
    db.session.add(item)
    db.session.commit()

    return { 'message': 'Item created' }, 200


@auth_utils.access_token_required
def update_item(item_id: int):
    
    user: models.User = flask.g.user

    data: dict = flask.request.json


    item: models.Item = db.session.execute(db.select(models.Item).filter_by(id=item_id)).scalar()
    if not item:
        return { 'message': 'Item not found' }, 404
    
    if item.user != user:
        return { 'message': 'Access required' }, 403
    

    updated: list[str] = []
    if isinstance(data.get('name'), str) and len(data.get('name')) < 32:
        item.name = data.get('name')
        updated.append('name')

    if isinstance(data.get('amount'), int):
        item.amount = data.get('amount')
        updated.append('amount')

    if isinstance(data.get('recursion'), int):
        item.recursion = data.get('recursion')
        updated.append('recursion')

    return { 'message': 'Item updated', 'updated': updated }, 200


@auth_utils.access_token_required
def delete_item(item_id: int):

    user: models.User = flask.g.user

    item: models.Item = db.session.execute(db.select(models.Item).filter_by(id=item_id)).scalar()
    if not item:
        return { 'message': 'Item not found' }, 404
    
    if item.user != user:
        return { 'message': 'Access required' }, 403
    
    db.session.delete(item)
    db.session.commit()

    return { 'message': 'Item has been deleted' }, 200
