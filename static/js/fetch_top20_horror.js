async function fetchTop20Horror() {
    const reponse = await fetch('http://localhost:5000/top20/genre/horror');
    const movies = await reponse.json();
    return movies;
}

fetchTop20Horror().then(movies => {
    movies;
    isolatedMovies = [];
    for (moviePage = 1; moviePage < 5; moviePage++) {
        var moviePages = movies[String(moviePage)]['results'];
        for (movie = 0; movie < 5; movie++) {
            isolatedMovies.push(moviePages[String(movie)]);
        }
    }
    console.log(isolatedMovies);
})