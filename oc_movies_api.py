import requests
import json
from flask import jsonify


class OcMoviesApi:
    def __init__(self):
        self.url = 'http://localhost:8000/api/v1/titles/'
    
    @staticmethod
    def json_maker(url, search_parameters):
        top_20_data = {}
        for page in ['1', '2', '3', '4']:
            search_parameters['page'] = page
            requested_data = requests.get(url, params=search_parameters)
            top_20_data[page] = json.loads(requested_data.content)
        return top_20_data

    def top_20_genre(self, genre):
        search_parameters = {'sort_by': '-imdb_score', 'genre': genre}
        return self.json_maker(self.url, search_parameters)
    
    def top_20(self):
        search_parameters = {'sort_by': '-imdb_score'}
        return self.json_maker(self.url, search_parameters)
