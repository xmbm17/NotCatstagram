let ts = "1686691583969";
let publicKey = "9fa901025efdc47b9023c5561ac7e0fb";
let hashVal = "82db15dcd1a058d07072328808772db9";
// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }

// window.onload = async() =>{

//   let date = new Date();
// // console.log(date.getTime());
// const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];
//   const url = `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
//   const url2 = `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=100&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`
//   const response = await fetch(url);
//   const jsonData = await response.json();

//   const res2 = await fetch(url2);
//   const jsonData2 = await res2.json();
//   console.log(jsonData.data)
//   console.log(jsonData2.data)
//   // const results = jsonData.data.results
//   // const randomizedResults = results.sort(() => getRandomInt(2) - 0.5);
//   // console.log(jsonData.data.limit = 1000)
//   // console.log(jsonData.data.count = 1000)
//   // console.log(randomizedResults)
// }

let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    // div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

button.addEventListener("click", getResults = async () => {
  if (input.value.trim().length < 1) {
    alert("Input cannot be blank");
    return;
  }

  showContainer.innerHTML = "";
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();
  const container = document.querySelector('.container');
  container.style.transition// WANNA BE TRANSITION
  jsonData.data["results"].forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("card-container", "fade-in"); // Add "fade-in" class
    div.innerHTML = `
      <div class="container-character-image">
        <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}"/>
      </div>
      <div class="character-name">${element.name}</div>
      <div class="character-description">${element.description}</div>
    `;

    showContainer.appendChild(div);

    // Trigger the transition by adding the "active" class after a short delay
    setTimeout(() => {
      div.classList.add("active");
    }, 100);
  });
});
window.onload = () => {
  getRsult();
};
