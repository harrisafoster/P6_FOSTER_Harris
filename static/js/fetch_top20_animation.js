async function fetchTop20Animation() {
    let reponse = await fetch('http://localhost:5000/top20/genre/animation');
    let data = await reponse.json();
    console.log(data);
}

fetchTop20Animation()