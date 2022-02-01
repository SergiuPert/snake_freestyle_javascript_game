from flask import Flask, render_template, redirect, url_for, request, session

import cryptography
import database_manager

app = Flask(__name__)
app.secret_key = b'_5#87x"F4Qdu\n\xec]/'


@app.route("/")
def main_page():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(
        port=5000,
        debug=True
    )