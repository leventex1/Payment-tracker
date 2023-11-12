from src import db
import sqlalchemy as sql
import sqlalchemy.orm as orm
import datetime

class Base(db.Model):
    __abstract__ = True
    id: orm.Mapped[int] = orm.mapped_column(sql.Integer, primary_key=True, autoincrement=True)
    created_at: orm.Mapped[datetime.datetime] = orm.mapped_column(sql.DateTime, default=datetime.datetime.utcnow)
    updated_at: orm.Mapped[datetime.datetime] = orm.mapped_column(sql.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)



class AuthUser(Base):
    email: orm.Mapped[str] = orm.mapped_column(sql.VARCHAR(32), unique=True, nullable=True)
    password: orm.Mapped[str] = orm.mapped_column(sql.VARCHAR(64))

    user: orm.Mapped['User'] = orm.relationship(back_populates='auth_user', uselist=False)

    def __init__(self, email: str, password: str) -> None:
        super().__init__()
        if len(email) > 32 or len(password) > 64:
            raise ValueError(f'email or password not valid: {email}, {password}')
        self.email = email
        self.password = password


class User(Base):
    username: orm.Mapped[str] = orm.mapped_column(sql.VARCHAR(32))
    auth_id: orm.Mapped[int] = orm.mapped_column(sql.ForeignKey('auth_user.id'))

    items: orm.Mapped[list['Item']] = orm.relationship(back_populates='user', uselist=True)
    auth_user: orm.Mapped[AuthUser] = orm.relationship(back_populates='user')

    def __init__(self, username: str, auth_id: int) -> None:
        super().__init__()
        if len(username) > 32:
            raise ValueError(f'username not valid: {username}')
        self.username = username
        self.auth_id = auth_id



class Item(Base):
    name: orm.Mapped[str] = orm.mapped_column(sql.VARCHAR(32))
    amount: orm.Mapped[int] = orm.mapped_column(sql.Integer)
    recursion: orm.Mapped[int] = orm.mapped_column(sql.Integer)
    user_id: orm.Mapped[int] = orm.mapped_column(sql.ForeignKey('user.id'))

    user: orm.Mapped[User] = orm.relationship(back_populates='items')

    def __init__(self, name: str, amount: int, recursion: int, user_id: int) -> None:
        super().__init__()
        if len(name) > 32:
            raise ValueError(f'name not valid: {name}')
        self.name = name
        self.amount = amount
        self.recursion = recursion
        self.user_id = user_id