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

function isolateTop20(genre) {
    var isolatedMoviesTop20 = [];
    if (genre) {
        isolatedMoviesTop20[genre] = fetchTop20Genre(genre);
        return isolatedMoviesTop20[genre];
    }
}

Promise.all([isolateTop20('overall'), isolateTop20('action'), isolateTop20('horror'), isolateTop20('animation')])
.then(result => {
    result.forEach(element => console.log(element));
})