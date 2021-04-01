from flask import Flask, render_template
import requests
import json
from oc_movies_api import OcMoviesApi
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/top20/genre/<genre>')
def query_top20_genre(genre):
    api = OcMoviesApi()
    return api.top_20_genre(genre)

@app.route('/top20')
def query_top20():
    api = OcMoviesApi()
    return api.top_20()

if __name__ == "__main__":
    app.run(debug=True)
