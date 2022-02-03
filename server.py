from flask import Flask,url_for, request, render_template, session,redirect
from json_response import json_response

import mimetypes
mimetypes.add_type('application/javascript', '.js')

import database_manager

app = Flask(__name__)
app.secret_key = b'_5#87x"F4Qdu\n\xec]/'


@app.route("/demo_login")
def demo_login():
    session["username"] = "asdf"
    return redirect(url_for('main_page'))


@app.route("/demo_logout")
def demo_logout():
    session["username"].pop()
    return redirect(url_for('main_page'))


@app.route("/")
def main_page():
    print(session["username"])
    return render_template('index.html')


@app.route("/")
def login_page():
    return


@app.route("/API-get-active-user")
@json_response
def get_active_user():
    return {"username": session["username"]} if "username" in session else {"username": ""}


@app.route("/APIgethighscore")
@json_response
def api_get_highscore():
    highscore = database_manager.get_highscore()
    return highscore


@app.route("/API-insert-highscore", methods=["GET", "POST", "PUT"])
@json_response
def api_insert_highscore():
    json_var = request.json
    print(json_var)
    database_manager.insert_highscore(json_var)


if __name__ == "__main__":
    app.run(
        port=5000,
        debug=True
    )
