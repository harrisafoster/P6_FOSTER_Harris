async function fetchTop20Horror() {
    let reponse = await fetch('http://localhost:5000/top20/genre/horror');
    let data = await reponse.json();
    console.log(data);
}

fetchTop20Horror()