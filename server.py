from flask import Flask, url_for, request, render_template, session, redirect

import cryptography
from json_response import json_response

import mimetypes
mimetypes.add_type('application/javascript', '.js')

import database_manager

app = Flask(__name__)
app.secret_key = b'_5#87x"F4Qdu\n\xec]/'


@app.route("/demo_login")
def demo_login():
    session.update({"username": "asdf"})
    return redirect(url_for("main_page"))


@app.route("/demo_logout")
def demo_logout():
    session.pop("username")
    return redirect(url_for("main_page"))


@app.route("/")
def main_page():
    print(session.get("username"))
    return render_template("index.html")


@app.route("/API-login", methods=["POST"])
@json_response
def login_page():
    json_var = request.json
    user = database_manager.get_user_by_username(json_var["username"])
    if cryptography.verify_password(json_var["password"], user["password"]):
        session.update({"username": user["username"]})
        return True
    return False


@app.route("/API-logout", methods=["GET"])
def logout():
    session.pop("username")
    return {"result": True}


@app.route("/API-register", methods=["POST"])
@json_response
def register_page():
    json_var = request.json
    if not database_manager.get_user_by_username(json_var["username"]):
        database_manager.insert_user(
            json_var["username"], cryptography.hash_password(json_var["password"])
        )
        session.update({"username": json_var["username"]})
        return True
    else:
        return False


@app.route("/API-get-active-user")
@json_response
def get_active_user():
    return {"username": session.get("username", "")}


@app.route("/APIgethighscore")
@json_response
def api_get_highscore():
    return database_manager.get_highscore()


@app.route("/API-insert-highscore", methods=["GET", "POST", "PUT"])
@json_response
def api_insert_highscore():
    json_var = request.json
    print(json_var)
    database_manager.insert_highscore(json_var)
    return {"result": True}

@app.route("/API-get-active-user-highscore")
@json_response
def api_get_user_highscore():
    return database_manager.get_user_highscore(session["username"])


if __name__ == "__main__":
    app.run(port=5000, debug=True)
