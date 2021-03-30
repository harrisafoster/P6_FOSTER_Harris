async function fetchTop20() {
    let reponse = await fetch('http://localhost:5000/top20');
    let data = await reponse.json();
    console.log(data);
}

fetchTop20()