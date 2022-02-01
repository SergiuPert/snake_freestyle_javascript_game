from flask import Flask, render_template
from json_response import json_response

import database_manager

app = Flask(__name__)
app.secret_key = b'_5#87x"F4Qdu\n\xec]/'


@app.route("/")
def main_page():
    return render_template('index.html')


@app.route("/")
def login_page():
    return

@app.route("/highscores")
def highscore_page():
    users = database_manager.get_highscore()
    return render_template('highscore.html', users=users)


@app.route("/APIgethighscore")
@json_response
def api_get_highscore():
    highscore = database_manager.get_highscore()
    return highscore


if __name__ == "__main__":
    app.run(
        port=5000,
        debug=True
    )