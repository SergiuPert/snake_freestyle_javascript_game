import database_connection


@database_connection.connection_handler
def get_user_by_username(cursor, username):
    query = """
            SELECT username,password
            FROM users
            WHERE username = %(username)s
            ;"""
    cursor.execute(query, {"username": username})
    return cursor.fetchone()


@database_connection.connection_handler
def get_highscore(cursor):
    query = """
        SELECT highscore, username
        FROM users
        ORDER BY highscore DESC
        ;"""
    cursor.execute(query)
    return cursor.fetchall()


@database_connection.connection_handler
def get_user_highscore(cursor, username):
    query = """
        SELECT highscore
        FROM users
        WHERE username = %(username)s
        ;"""
    cursor.execute(query, {"username": username})
    return cursor.fetchone()


@database_connection.connection_handler
def insert_user(cursor, username, password):
    query = """
                    INSERT INTO users(username, password)
                    VALUES(%(username)s, %(password)s)
            ;"""
    cursor.execute(query, {"username": username, "password": password})


@database_connection.connection_handler
def insert_highscore(cursor, user):
    query = """
                    UPDATE users
                    SET highscore = %(highscore)s
                    WHERE username = %(username)s
                    
            ;"""
    cursor.execute(query, user)
