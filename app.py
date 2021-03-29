from flask import Flask, render_template
import requests
import json
from category import Category

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/<genre>')
def return_json(genre):
    api = Category()
    if genre == 'None':
        return api.top_16_finder(None)
    else:
        return api.top_16_finder(genre)

## javascripts can access multiple routes to do 4 requests at same time
## route that filters by category?
## one route to render page, one route for each category
## this allows asychronous java requests via flask
## one route can go to all four categories and return json data
if __name__ == "__main__":
    app.run(debug=True)
