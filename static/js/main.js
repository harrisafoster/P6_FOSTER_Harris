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
        const response = await fetch(('http://localhost:5000/top20/overall'));
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

function show_data(genre, carousel_name) {
    Promise.all([isolateTop20(genre)])
    .then(result => result['0'])
    .then(data => data.forEach(movie => {
        console.log(movie);
        var div = document.createElement('div');
        div.setAttribute('class', 'carousel__movie');
        div.setAttribute('id', movie['id']);
        var title = document.createElement('p');
        title.setAttribute('class', 'movie__title');
        title.innerHTML = movie['title'];
        var image = document.createElement('img');
        image.setAttribute('class', 'movie__image');
        image.setAttribute('src', movie['image_url']);
        div.appendChild(image);
        div.appendChild(title);
        var carousel = document.getElementById(carousel_name);
        carousel.appendChild(div)
    }))
    .then(result => {
        new Carousel(document.querySelector('#' + carousel_name), {
            slidesToScroll: 3,
            slidesVisible: 5
        })
    })
}

//show_data('action');
//show_data('horror');
//show_data('animation');