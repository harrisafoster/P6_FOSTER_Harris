async function fetchTop20Action() {
    let reponse = await fetch('http://localhost:5000/top20/genre/action');
    let data = await reponse.json();
    console.log(data);
}

fetchTop20Action()