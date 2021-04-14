console.log('The javascript loaded');

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
    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle () {
        let ratio = this.movies.length / this.options.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.movies.forEach(movie => movie.style.width = ((100 / this.options.slidesVisible) / ratio) + "%");
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
        this.gotoItem(this.currentMovie + this.options.slidesToScroll)
    }

    prev () {
        this.gotoItem(this.currentMovie - this.options.slidesToScroll)
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

}

document.addEventListener('DOMContentLoaded', function() {
    new Carousel(document.querySelector("#carouselOverall"), {
        slidesToScroll: 3,
        slidesVisible: 5
    })
    new Carousel(document.querySelector("#carouselAction"), {
        slidesToScroll: 3,
        slidesVisible: 5
    })
    new Carousel(document.querySelector("#carouselHorror"), {
        slidesToScroll: 3,
        slidesVisible: 5
    })
    new Carousel(document.querySelector("#carouselAnimation"), {
        slidesToScroll: 3,
        slidesVisible: 5
    })
})


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

function show_data(genre) {
    var movies = [];
    Promise.all([isolateTop20(genre)])
    .then(result => {
        console.log(result['0']);
        document.getElementById(genre).innerHTML = JSON.stringify(result);
    })
}

//show_data('overall');
//show_data('action');
//show_data('horror');
//show_data('animation');