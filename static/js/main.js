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
    if (genre) {
        isolatedMoviesTop20[genre] = fetchTop20Genre(genre);
        return isolatedMoviesTop20[genre];
    }
}

console.log(isolateTop20('overall'));
console.log(isolateTop20('action'));
console.log(isolateTop20('horror'));
console.log(isolateTop20('animation'));

//['1']['results']['0']