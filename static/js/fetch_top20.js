async function fetchTop20() {
    let url = 'http://localhost:5000/top20';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
/// problem, array type object? forEach isn't working
async function renderTop20() {
    let movies = await fetchTop20();
    let html = '';
    movies.forEach(movie => {
        let htmlSegment = `<div class="movie">
                           <img src="${movie.image_url}" >
                           <h2>${movie.title} ${movie.imdb_score}</h2>
                           </div>`;
        html += htmlSegment;
    });

let container = document.querySelector('.container');
container.innerHTML = html;
}

renderTop20()