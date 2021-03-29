import requests
import json
## paramenters to reconsctruct URLS requests documentation
class Category:
    @staticmethod
    def json_maker(url):
        requested_data = requests.get(url)
        content_of_data = requested_data.content
        json_data = json.loads(content_of_data)
        return json_data

    def top_16_finder(self, genre):
        if genre:
            url = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score' + '&genre=' + genre
        else:
            url = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'
        return self.json_maker(url)
## get and return data in these methods, used in flask file
## flask dans contrôleurs
## no views, accomplished in javascript