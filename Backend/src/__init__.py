import flask
import flask_sqlalchemy
import sqlalchemy
import flask_bcrypt
import flask_migrate
import flask_cors

class Config:
    SECRET='68725b0f29c48fa75e9fdc97463b9cea'

    SQLALCHEMY_DATABASE_URI='sqlite:///project.db'


class Base(sqlalchemy.orm.DeclarativeBase):
    pass
convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
metadata = sqlalchemy.MetaData(naming_convention=convention)
db = flask_sqlalchemy.SQLAlchemy(model_class=Base, metadata=metadata)
bcrypt = flask_bcrypt.Bcrypt()
migrate = flask_migrate.Migrate(render_as_batch=True)
cors = flask_cors.CORS()


def create_app() -> flask.Flask:
    flask_app = flask.Flask(__name__)
    flask_app.config.from_object(obj=Config)

    db.init_app(flask_app)
    bcrypt.init_app(flask_app)
    migrate.init_app(flask_app, db)
    cors.init_app(flask_app)

    with flask_app.app_context():
        db.create_all()

    from src.routes.users import users as user_routes
    from src.routes.auth import auth as auth_routes
    from src.routes.items import items as item_routes

    flask_app.register_blueprint(user_routes)
    flask_app.register_blueprint(auth_routes)
    flask_app.register_blueprint(item_routes)

    return flask_app