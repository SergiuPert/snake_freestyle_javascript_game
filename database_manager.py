import database_connection


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
def insert_user(cursor, username, password):
    query = """
                    INSERT INTO users(username, password)
                    VALUES(%(username)s, %(password)s)
            ;"""
    cursor.execute(query, {"username": username, "password": password})


def insert_highscore(json):
    return None