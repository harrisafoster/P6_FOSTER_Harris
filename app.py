from flask import Flask, render_template, url_for
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

@app.route('/top20/overall')
def query_top20():
    api = OcMoviesApi()
    return api.top_20()

@app.route('/movies/id/<movie_id>')
def query_by_id(movie_id):
    api = OcMoviesApi()
    return api.get_film_by_id(movie_id)

@app.route('/topfilm')
def query_top_film():
    api = OcMoviesApi()
    return api.top_film_overall()

if __name__ == "__main__":
    app.run(debug=True)

## add doctrings