import requests
import json
import pandas as pd


class OcMoviesApi:
    def __init__(self):
        self.url = 'http://localhost:8000/api/v1/titles/'
    
    @staticmethod
    def json_maker(url, search_parameters):
        top_20_data = {}
        for page in ['1', '2', '3', '4']:
            search_parameters['page'] = page
            requested_data = requests.get(url, params=search_parameters)
            dicted_data = json.loads(requested_data.content)
            filtered_data = {}
            i = (int(page) * 5) - 4
            for movie in dicted_data['results']:
                filtered_data[str(i)] = {'id': movie['id'], 'title': movie['title'], 'image_url': movie['image_url']}
                i += 1
            top_20_data[page] = filtered_data
        df = pd.json_normalize(top_20_data, max_level=1)
        final_top_20_data = df.to_dict(orient='records')[0]
        return final_top_20_data

    def top_20_genre(self, genre):
        search_parameters = {'sort_by': '-imdb_score', 'genre': genre}
        return self.json_maker(self.url, search_parameters)
    
    def top_20(self):
        search_parameters = {'sort_by': '-imdb_score'}
        return self.json_maker(self.url, search_parameters)
    
    def get_film_by_id(self, id):
        return json.loads(requests.get((self.url + str(id))).content)