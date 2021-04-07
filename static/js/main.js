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

show_data('overall');
show_data('action');
show_data('horror');
show_data('animation');