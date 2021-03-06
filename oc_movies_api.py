import requests
import json


class OcMoviesApi:
    '''
    The OcMoviesApi class contains the URL for the OC Movies server
    as well as all methods (sub-functions) to access the API and 
    return data.

    Initilaize with OcMoviesApi()
    '''
    def __init__(self):
        self.url = 'http://localhost:8000/api/v1/titles/'
    
    @staticmethod
    def json_maker(url, search_parameters):
        '''
        .json_maker is used to retrieve, parse, and return json data for the 
        first four pages of a given genre.
        :type args: str, dict
        :param '*args': url for accessing API, search parameters for defining
        search criteria
        '''
        top_7_data = []
        for page in ['1', '2']:
            search_parameters['page'] = page
            requested_data = (requests.get(url, params=search_parameters)).json()
            i = (int(page) * 5) - 4
            for movie in requested_data['results']:
                top_7_data.append({'id': movie['id'], 'title': movie['title'], 'image_url': movie['image_url']})
                i += 1
        final_data = json.dumps(top_7_data[:7])
        return final_data

    def top_7_genre(self, genre):
        '''
        .top_7_genre returns json data on the top 7 films of a given genre
        :param arg: genre of type str used to complete the search parameters
        when accessing the api
        :type arg: str
        '''
        search_parameters = {'sort_by': '-imdb_score', 'genre': genre}
        return self.json_maker(self.url, search_parameters)
    
    def top_7(self):
        '''
        .top_7 returns json data on the top 7 films overall
        :param arg: no argument is needed
        '''
        search_parameters = {'sort_by': '-imdb_score'}
        return self.json_maker(self.url, search_parameters)
    
    def get_film_by_id(self, id):
        '''
        .get_film_by_id returns json data on the film matching the given id
        :param arg: id number of film used to find a specific film in the api
        :type arg: str
        '''
        endpoint = f"{self.url}{id}"
        response = requests.get(endpoint)
        data = response.json()
        worldwide_gross_income = data.get('worldwide_gross_income')
        if worldwide_gross_income is None:
            data["worldwide_gross_income"] = 'Data unavailable'
        else:
            data["worldwide_gross_income"] = f"{worldwide_gross_income:,}{'$'}"
        return data

    def top_film_overall(self):
        '''
        .top_film_overall returns json data on the top film overall
        :param arg: no argument is taken
        '''
        sorted_data = (requests.get(self.url, params={'sort_by': '-imdb_score'})).json()
        topfilm_id = sorted_data['results'][0]['id']
        topfilm = (requests.get(self.url + str(topfilm_id))).json()
        topfilm_data = {'id': topfilm['id'], 'title': topfilm['title'], 'image_url': topfilm['image_url'], 'description': topfilm['long_description']}
        return topfilm_data