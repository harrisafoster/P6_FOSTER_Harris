async function fetchTop20Genre(genre) {
    if (genre === 'overall') {
        const response = await fetch(('http://localhost:5000/top20/overall'));
        const movies = await response.json();
        return movies;
    } else {
        const response = await fetch('http://localhost:5000/top20/genre/' + genre);
        const movies = await response.json();
        return movies;
    }
}

function isolateTop20(genre) {
    var isolatedMoviesTop20 = [];
    if (genre != 'overall') {
        isolatedMoviesTop20[genre] = [];
        fetchTop20Genre(genre).then(movies => {
            movies;
            for (moviePage = 1; moviePage < 5; moviePage++) {
                var moviePages = movies[String(moviePage)]['results'];
                for (movie = 0; movie < 5; movie++) {
                    isolatedMoviesTop20[genre].push(moviePages[String(movie)]);
                }
            }
        })
        return isolatedMoviesTop20[genre];
    } else {
        isolatedMoviesTop20[genre] = [];
        fetchTop20Genre('overall').then(movies => {
            movies;
            for (moviePage = 1; moviePage < 5; moviePage++) {
                var moviePages = movies[String(moviePage)]['results'];
                for (movie = 0; movie < 5; movie++) {
                    isolatedMoviesTop20[genre].push(moviePages[String(movie)]);
                }
            }
        })
        return isolatedMoviesTop20[genre];
    }
}

console.log(isolateTop20('overall'));
console.log(isolateTop20('action'));
console.log(isolateTop20('horror'));
console.log(isolateTop20('animation'));

//['1']['results']['0']