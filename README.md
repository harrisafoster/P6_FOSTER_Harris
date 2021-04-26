# P4_FOSTER_Harris
JustStreamIt

Application web/mobile qui recommande les meilleurs films actuels. Cet outil
vous aide à choisir quel film regarder ce soir ! 

Projet 6 OpenClassrooms

Cette application vous recommande:

1. Le film le mieux noté d'aujourd'hui (selon son score IMDB)
2. Les 7 films les mieux notés d'aujourd'hui sur tous les films
3. Les 7 films les mieux notés d'aujourd'hui de trois catégories (action, horreur, animation)

## Prérequis de base
1. Une application de type 'terminal' - GitBash, Mintty, Cygwin (si vous êtes sur Windows) ou les terminaux par défaut si vous utilisez Macintosh ou Linux.
2. La base de données 'ocmovies' qui se trouve ici: https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR
3. Python 3.9

## Installation
### Pour les développeurs et utilisateurs (windows 10, mac, linux) :
#### Clonez la source de la base de données localement (en utilisant votre terminal) :
```sh
$ git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR
$ cd ocmovies-api
```
#### Clonez la source de JustStreamIt localement (en utilisant votre terminal) :
```sh
$ git clone https://github.com/harrisafoster/P6_FOSTER_Harris
$ cd P6_FOSTER_Harris
```
#### Ouvrez deux fenêtres de votre terminal

##### Dans le premier terminal dans le dossier ocmovies-api: Créer et activer un environnement virtuel avec (windows 10) :
```sh
$ python -m venv env
$ source ./env/Scripts/activate
```
##### Créer et activer un environnement virtuel avec (mac & linux) :
```sh
$ virtualenv venv
$ source venv/bin/activate
```
##### Et installez les packages requis avec :
```sh
$ pip install -r requirements.txt
```
##### Dans le deuxième terminal dans le dossier P6_FOSTER_Harris: Créer et activer un environnement virtuel avec (windows 10) :
```sh
$ python -m venv env
$ source ./env/Scripts/activate
```
##### Créer et activer un environnement virtuel avec (mac & linux) :
```sh
$ virtualenv venv
$ source venv/bin/activate
```
##### Et installez les packages requis avec :
```sh
$ pip install -r requirements.txt
```

## Utilisation
### Vous pouvez mettre la base de données en route depuis votre terminal avec :
#### Dans le terminal où vous avez activé l'environnement virtuel du ocmovies-api
```sh
$ python manage.py runserver
```
### Vous pouvez mettre l'application en route depuis votre terminal avec :
#### Dans le terminal où vous avez activé l'environnement virtuel du P6_FOSTER_Harris
```sh
$ python app.py
```
### Puis vous pouvez accéder à l'application dans votre navigateur en mettant :
localhost:5000/ (dans la barre de navigation de votre navigateur préféré)

Dès que le logiciel est lancé, vous pouvez regarder les details sur tous les films en cliquant sur leurs images. Et vous pouvez defiler entre les differents films en utilisants les flèches à gauche et à droite de chaque catégorie. 

## Built with
Python 3.9 <br />
JavaScript <br />
CSS <br />
HTML 