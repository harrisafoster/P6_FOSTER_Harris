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

function renderTop20 (genre, carousel_name) {
    show_data(genre, carousel_name);
    new Carousel(document.querySelector('#' + carousel_name), {
        slidesToScroll: 3,
        slidesVisible: 5
    })
}

async function fetchTop20Genre(genre) {
    if (genre === 'overall') {
        const response = await fetch('http://localhost:5000/top20/overall');
        var movies = await response.json();
        return movies;
    } else {
        const response = await fetch('http://localhost:5000/top20/genre/' + genre);
        var movies = await response.json();
        return movies;
    }
}

async function isolateTop20(genre) {
    var isolatedMoviesTop20 = [];
    if (genre) {
        isolatedMoviesTop20[genre] = await fetchTop20Genre(genre);
        return isolatedMoviesTop20[genre];
    }
}

async function fetchMovieById(id) {
    const response = await fetch('http://localhost:5000/movies/id/' + String(id));
    var movie = await response.json();
    return movie;
}

async function showTopFilm () {
    fetch('http://localhost:5000/topfilm')
    .then(response => response.json())
    .then(data => {
        var featuredSlot = document.getElementById('topfilm');
        var title = document.createElement('p');
        title.setAttribute('class', 'movie__title');
        title.innerHTML = data['title'];
        var image = document.createElement('img');
        image.setAttribute('class', 'featured__image');
        image.setAttribute('src', data['image_url']);
        var description = document.createElement('p');
        description.setAttribute('class', 'movie__description');
        description.innerHTML = data['description'];
        featuredSlot.appendChild(title);
        featuredSlot.appendChild(image);
        featuredSlot.appendChild(description);
    })
}

function createModal (movieId) {
    let carouselMovieContainer = document.getElementById('modal__location');
    if (carouselMovieContainer.hasChildNodes()) {
        carouselMovieContainer.firstChild.remove()
    }
    fetchMovieById(movieId)
    .then(movie => {
        var modalContainer = document.createElement('div');
        modalContainer.setAttribute('class', 'modal__container');
        var modal = document.createElement('div');
        modal.setAttribute('class', 'modal');
        var modalImage = document.createElement('img');
        modalImage.setAttribute('class', 'modal__image');
        modalImage.setAttribute('src', movie['image_url']);
        var modalTitle = document.createElement('p');
        modalTitle.setAttribute('class', 'modal__title');
        modalTitle.innerHTML = movie['title'];
        var modalGenre = document.createElement('ul');
        modalGenre.setAttribute('class', 'modal__genre');
        modalGenre.innerHTML = movie['genres'];
        var modalReleaseDate = document.createElement('p');
        modalReleaseDate.setAttribute('class', 'modal__releaseDate');
        modalReleaseDate.innerHTML = movie['date_published']
        var modalRating = document.createElement('p');
        modalRating.setAttribute('class', 'modal__rating');
        modalRating.innerHTML = movie['rated'];
        var modalImbdScore = document.createElement('p');
        modalImbdScore.setAttribute('class', 'modal__imdbScore');
        modalImbdScore.innerHTML = movie['imdb_score'];
        var modalDirector = document.createElement('ul');
        modalDirector.setAttribute('class', 'modal__director');
        modalDirector.innerHTML = movie['directors'];
        var modalActors = document.createElement('ul');
        modalActors.setAttribute('class', 'modal__actors');
        modalActors.innerHTML = movie['actors'];
        var modalDuration = document.createElement('p');
        modalDuration.setAttribute('class', 'modal__duration');
        modalDuration.innerHTML = movie['duration'];
        var modalCountryOfOrigin = document.createElement('p');
        modalCountryOfOrigin.setAttribute('class', 'modal__countryOfOrigin');
        modalCountryOfOrigin.innerHTML = movie['countries'];
        var modalBoxOfficeResult = document.createElement('p');
        modalBoxOfficeResult.setAttribute('class', 'modal__boxOfficeResult');
        modalBoxOfficeResult.innerHTML = movie['worldwide_gross_income'];
        var modalDescription = document.createElement('p');
        modalDescription.setAttribute('class', 'modal__description');
        modalDescription.innerHTML = movie['long_description'];
        var modalClose = document.createElement('span');
        modalClose.setAttribute('class', 'modal__close');
        modalClose.innerHTML = 'X';
        modal.appendChild(modalImage);
        modal.appendChild(modalTitle);
        modal.appendChild(modalGenre);
        modal.appendChild(modalReleaseDate);
        modal.appendChild(modalRating);
        modal.appendChild(modalImbdScore);
        modal.appendChild(modalDirector);
        modal.appendChild(modalActors);
        modal.appendChild(modalDuration);
        modal.appendChild(modalCountryOfOrigin);
        modal.appendChild(modalBoxOfficeResult);
        modal.appendChild(modalDescription);
        modal.appendChild(modalClose);
        modalContainer.appendChild(modal);
        carouselMovieContainer.appendChild(modalContainer);
        carouselMovieContainer.firstChild.classList.add('modal__container__active');
    })
}

function show_data(genre, carousel_name) {
    Promise.all([isolateTop20(genre)])
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
        //Comment ajouter les event listeners pour chaque film ???
        div.addEventListener('click', Event => {
            createModal(movie['id'])
        });
        var carousel = document.getElementById(carousel_name);
        carousel.appendChild(div);
    }))
    .then(result => {
        new Carousel(document.querySelector('#' + carousel_name), {
            slidesToScroll: 3,
            slidesVisible: 5
        })
    })
}
//can search for all movie divs and add on-click action, use classes! Can search by image and then use stored ID to do request.