class Carousel {
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slidesToScroll Number of elements to scroll through
     * @param {Object} options.slidesVisible Number of elements to show at one time
     */
    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentMovie = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.movies = children.map((child) => {
            let movie = this.createDivWithClass('carousel__movie')
            movie.appendChild(child)
            this.container.appendChild(movie)
            return movie
        })
        this.setStyle();
        this.createNavigation();
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle () {
        let ratio = this.movies.length / this.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.movies.forEach(movie => movie.style.width = ((100 / this.slidesVisible) / ratio) + "%");
    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next');
        let prevButton = this.createDivWithClass('carousel__prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
    }

    next () {
        this.gotoItem(this.currentMovie + this.slidesToScroll)
    }

    prev () {
        this.gotoItem(this.currentMovie - this.slidesToScroll)
    }

    /**
     * Défile les films selon l'index indiqué.
     * @param {number} index 
     */
    gotoItem(index) {
        if (index < 0) {
            index = this.movies.length - this.options.slidesVisible
        } else if (index >= this.movies.length || this.movies[this.currentMovie + this.options.slidesVisible] === undefined) {
            index = 0
        }
        let translateX = index * -100 / this.movies.length;
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        this.currentMovie = index;
    }

    onWindowResize () {
        let mobile = window.innerWidth < 800
        if (mobile != this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
        }
    }

    /**
     * 
     * @param {string} className 
     * @return {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    /**
     * @returns {number}
     */
    get slidesToScroll () {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }

    /**
     * @returns {number}
     */
    get slidesVisible () {
        return this.isMobile ? 1 : this.options.slidesVisible
    }

}

document.addEventListener('DOMContentLoaded', function() {
    showTopFilm();
    show_data('overall', 'carouselOverall');
    show_data('action', 'carouselAction');
    show_data('horror', 'carouselHorror');
    show_data('animation', 'carouselAnimation');
})

/**
 * 
 * @param {string} genre 
 * @returns {promise} json data on top 7 films of requested genre 
 */
async function fetchTop7Genre(genre) {
    if (genre === 'overall') {
        const response = await fetch('http://localhost:5000/top7/overall');
        var movies = await response.json();
        return movies;
    } else {
        const response = await fetch('http://localhost:5000/top7/genre/' + genre);
        var movies = await response.json();
        return movies;
    }
}

/**
 * 
 * @param {string} genre 
 * @returns {array} data of the genre requested
 */
async function isolateTop7(genre) {
    var isolatedMoviesTop7 = [];
    if (genre) {
        isolatedMoviesTop7[genre] = await fetchTop7Genre(genre);
        return isolatedMoviesTop7[genre];
    }
}

/**
 * 
 * @param {string} id 
 * @returns {json} data on requested film
 */
async function fetchMovieById(id) {
    const response = await fetch('http://localhost:5000/movies/id/' + String(id));
    var movie = await response.json();
    return movie;
}

/**
 * Renders the featured film section at the top of the page
 */
async function showTopFilm () {
    fetch('http://localhost:5000/topfilm')
    .then(response => response.json())
    .then(data => {
        var featuredSlot = document.getElementById('topfilm');
        var title = document.createElement('p');
        title.setAttribute('class', 'featured__movie__title');
        title.innerHTML = data['title'];
        var image = document.createElement('img');
        image.setAttribute('class', 'featured__image');
        image.setAttribute('src', data['image_url']);
        var description = document.createElement('p');
        description.setAttribute('class', 'featured__movie__description');
        description.innerHTML = data['description'];
        var button = document.createElement('btn');
        button.setAttribute('class', 'featured__film__button');
        button.innerHTML = 'See this on IMDB';
        button.addEventListener('click', Event => {
            window.open("https://www.imdb.com/title/tt000000" + data['id']);
        })
        featuredSlot.appendChild(title);
        featuredSlot.appendChild(image);
        featuredSlot.appendChild(button);
        featuredSlot.appendChild(description);
    })
}

/**
 * 
 * @param {string} movieId 
 * @param {string} movieGenre 
 * Creates the modal window pertaining to the film that is clicked
 * It does this by executing a fetch request with the film's ID number
 * After retrieving the desired data the function creates the modal window
 * as well as its closeModal span button and the ability to close the window
 * by clicking outside of it.
 */
function createModal (movieId, movieGenre) {
    let modalContainer = document.getElementById('modal__location');
    if (modalContainer.hasChildNodes()) {
        modalContainer.innerHTML = "";
    }
    fetchMovieById(movieId)
    .then(movie => {
        var modal = document.createElement('div');
        modal.setAttribute('class', 'modal__container');
        //Description1 will contain the title and the image
        var description1 = document.createElement('div');
        description1.setAttribute('class', 'description__1');
        var modalImage = document.createElement('img');
        modalImage.setAttribute('src', movie['image_url']);
        var modalTitle = document.createElement('h3');
        modalTitle.innerHTML = movie['original_title'];
        //Description2 will contain the releaseDate, Duration, CountryOfOrigin, Genres, Rating, IMDB score, and BoxOfficeResult
        var description2 = document.createElement('div');
        description2.setAttribute('class', 'description__2')
        var modalReleaseDate = document.createElement('p');
        modalReleaseDate.innerHTML = 'Date released: ' + movie['date_published'];
        var modalDuration = document.createElement('p');
        modalDuration.innerHTML = 'Duration (minutes): ' + movie['duration'];
        var modalCountryOfOrigin = document.createElement('p');
        modalCountryOfOrigin.innerHTML = 'Country of origin: '+ movie['countries'];
        var modalGenre = document.createElement('p');
        modalGenre.innerHTML = 'Genres: ' + movie['genres'];
        var modalRating = document.createElement('p');
        modalRating.innerHTML = 'Rating: ' + movie['rated'];
        var modalImbdScore = document.createElement('p');
        modalImbdScore.innerHTML = 'IMDB Score: ' + movie['imdb_score'];
        var modalBoxOfficeResult = document.createElement('p');
        modalBoxOfficeResult.innerHTML = 'Box Office Result (in amount earned worldwide): ' + movie['worldwide_gross_income'];
        //Description3 will contain Directors, Actors, and the film summary
        var description3 = document.createElement('div');
        description3.setAttribute('class', 'description__3')
        var modalDirector = document.createElement('p');
        modalDirector.innerHTML = 'Directors: '+ movie['directors'];
        var modalActors = document.createElement('p');
        modalActors.innerHTML = 'Actors: ' + movie['actors'];
        var modalDescription = document.createElement('p');
        modalDescription.innerHTML = 'Summary of film: ' + movie['long_description'];
        var modalClose = document.createElement('span');
        modalClose.setAttribute('class', 'modal__close');
        modalClose.innerHTML = 'X';
        description1.appendChild(modalTitle);
        description1.appendChild(modalImage);
        description2.appendChild(modalReleaseDate);
        description2.appendChild(modalDuration);
        description2.appendChild(modalCountryOfOrigin);
        description2.appendChild(modalGenre);
        description2.appendChild(modalRating);
        description2.appendChild(modalImbdScore);
        description2.appendChild(modalBoxOfficeResult);
        description3.appendChild(modalDirector);
        description3.appendChild(modalActors);
        description3.appendChild(modalDescription);
        modal.appendChild(modalClose);
        modal.appendChild(description1);
        modal.appendChild(description2);
        modal.appendChild(description3);
        modalContainer.appendChild(modal);
        modalContainer.firstChild.classList.add('modal__container__active');
        modalClose.addEventListener('click', function () {
            modalContainer.firstChild.classList.remove('modal__container__active');
            modalContainer.innerHTML = "";
        })
        window.addEventListener('click', event => {
            if (event.target != modalContainer) {
                modalContainer.innerHTML = "";
            }
        })
    })
}

/**
 * 
 * @param {string} genre 
 * @param {string} carousel_name 
 * Populates the specified carousel with the appropriate top7 data
 * Also creates the onClick event to open modal windows.
 */
function show_data(genre, carousel_name) {
    Promise.all([isolateTop7(genre)])
    .then(result => result['0'])
    .then(data => data.forEach(movie => {
        //Movie div creation and adjustment
        var div = document.createElement('div');
        div.setAttribute('class', 'carousel__movie__container');
        div.setAttribute('id', movie['id']);
        //Title paragraph creation and adjustment
        var title = document.createElement('p');
        title.setAttribute('class', 'movie__title');
        title.innerHTML = movie['title'];
        //Image rendering and adjustment
        var image = document.createElement('img');
        image.setAttribute('class', 'movie__image');
        image.setAttribute('src', movie['image_url']);
        div.appendChild(image);
        div.appendChild(title);
        //Adds event to create the modal window onClick
        div.addEventListener('click', Event => {
            createModal(movie['id'])
        });
        var carousel = document.getElementById(carousel_name);
        carousel.appendChild(div);
    }))
    .then(result => {
        new Carousel(document.querySelector('#' + carousel_name), {
            slidesToScroll: 2,
            slidesVisible: 4
        })
    })
}