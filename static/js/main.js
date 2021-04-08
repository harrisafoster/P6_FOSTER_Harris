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
        this.children = [].slice.call(element.children)
        let ratio = this.children.length / this.options.slidesVisible
        let root = this.createDivWithClass('carousel')
        let container = this.createDivWithClass('carousel__container')
        container.style.width = (ratio * 100) + "%"
        root.appendChild(container)
        this.element.appendChild(root)
        this.children.forEach((child) => {
            let movie = this.createDivWithClass('carousel__movie')
            movie.style.width = ((100 / this.options.slidesVisible) / ratio) + "%"
            movie.appendChild(child)
            container.appendChild(movie)
        })
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
        slidesToScroll: 5,
        slidesVisible: 5
    })
    new Carousel(document.querySelector("#carouselAction"), {
        slidesToScroll: 5,
        slidesVisible: 5
    })
    new Carousel(document.querySelector("#carouselHorror"), {
        slidesToScroll: 5,
        slidesVisible: 5
    })
    new Carousel(document.querySelector("#carouselAnimation"), {
        slidesToScroll: 5,
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